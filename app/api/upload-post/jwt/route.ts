import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const UPLOAD_POST_API_BASE = 'https://api.upload-post.com';

function getUserIdFromHeaders(request: Request): string | null {
  const headerValue = request.headers.get('x-user-id');
  const trimmed = headerValue?.trim();
  return trimmed ? trimmed : null;
}

function getApiKey(): string | null {
  const key = process.env.UPLOAD_POST_API_KEY;
  return key && key.trim().length > 0 ? key : null;
}

async function readJsonSafe<T = unknown>(
  response: Response,
): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

type GenerateJwtRequestBody = {
  platforms?: string[];
  redirect_url?: string;
  logo_image?: string;
  redirect_button_text?: string;
};

export const POST = async (request: Request) => {
  const userId = getUserIdFromHeaders(request);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Missing UserID header' },
      { status: 400 },
    );
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: 'Server misconfiguration: missing API key' },
      { status: 500 },
    );
  }

  let bodyFromClient: GenerateJwtRequestBody | null = null;
  try {
    bodyFromClient = (await request.json()) as GenerateJwtRequestBody;
  } catch {
    bodyFromClient = null;
  }

  // Derive a sensible redirect URL
  const origin = request.headers.get('origin')?.trim();
  const appUrlFromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const baseUrl = appUrlFromEnv || origin || '';
  const defaultRedirectUrl = baseUrl ? `${baseUrl}/` : undefined;

  const upstreamBody = {
    username: userId,
    ...(bodyFromClient?.platforms && bodyFromClient.platforms.length
      ? { platforms: bodyFromClient.platforms }
      : {}),
    ...(bodyFromClient?.logo_image
      ? { logo_image: bodyFromClient.logo_image }
      : {}),
    ...(bodyFromClient?.redirect_button_text
      ? { redirect_button_text: bodyFromClient.redirect_button_text }
      : {}),
    // Prefer client-provided redirect, else env/origin based default
    ...(bodyFromClient?.redirect_url
      ? { redirect_url: bodyFromClient.redirect_url }
      : defaultRedirectUrl
        ? { redirect_url: defaultRedirectUrl }
        : {}),
  } as Record<string, unknown>;

  const upstream = await fetch(
    `${UPLOAD_POST_API_BASE}/api/uploadposts/users/generate-jwt`,
    {
      method: 'POST',
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upstreamBody),
      cache: 'no-store',
    },
  );

  const upstreamJson = await readJsonSafe(upstream);

  if (!upstream.ok) {
    return NextResponse.json(
      upstreamJson ?? { success: false, message: 'Upstream error' },
      { status: upstream.status },
    );
  }

  return NextResponse.json(upstreamJson ?? { success: true }, { status: 200 });
};
