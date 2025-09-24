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

export const GET = async (request: Request) => {
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

  const url = `${UPLOAD_POST_API_BASE}/api/uploadposts/users/${encodeURIComponent(userId)}`;

  console.log({ url });

  const upstream = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `ApiKey ${apiKey}`,
    },
    cache: 'no-store',
  });

  if (!upstream.ok) {
    const errorBody = await readJsonSafe(upstream);
    return NextResponse.json(
      errorBody ?? { success: false, message: 'Upstream error' },
      { status: upstream.status },
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data, { status: 200 });
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

  const upstream = await fetch(
    `${UPLOAD_POST_API_BASE}/api/uploadposts/users`,
    {
      method: 'POST',
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userId }),
      cache: 'no-store',
    },
  );

  const upstreamBody = await readJsonSafe(upstream);

  console.log({ upstream, upstreamBody, url: `${UPLOAD_POST_API_BASE}/users` });

  if (!upstream.ok) {
    return NextResponse.json(
      upstreamBody ?? { success: false, message: 'Upstream error' },
      { status: upstream.status },
    );
  }

  const responsePayload = {
    ...(upstreamBody as Record<string, unknown>),
  };

  return NextResponse.json(responsePayload, { status: upstream.status || 201 });
};
