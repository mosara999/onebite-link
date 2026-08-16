import { NextRequest, NextResponse } from "next/server";

function extractMetaContent(html: string, attr: "property" | "name", key: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${key}["']`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return undefined;
}

function extractTitleTag(html: string) {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const response = await fetch(target.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0)",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    const rawTitle =
      extractMetaContent(html, "property", "og:title") ??
      extractTitleTag(html) ??
      target.hostname;
    const rawDescription =
      extractMetaContent(html, "property", "og:description") ??
      extractMetaContent(html, "name", "description") ??
      "";
    const rawImage = extractMetaContent(html, "property", "og:image");

    return NextResponse.json({
      title: decodeHtmlEntities(rawTitle).slice(0, 200),
      description: decodeHtmlEntities(rawDescription).slice(0, 300),
      image: rawImage
        ? new URL(decodeHtmlEntities(rawImage), target).toString()
        : undefined,
      url: target.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "failed to fetch open graph data" },
      { status: 502 },
    );
  }
}
