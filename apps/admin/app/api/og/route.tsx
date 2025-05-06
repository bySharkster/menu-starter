import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 128) : "Menu";
    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 128)
      : "You are viewing a menu";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "black",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.10)",
              borderRadius: 32,
              padding: "48px 64px",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 900,
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: 2,
                margin: 0,
                textShadow: "0 2px 16px rgba(0,0,0,0.4)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                color: "#f3f3f3",
                fontSize: 40,
                fontWeight: 400,
                marginTop: 32,
                marginBottom: 0,
                textAlign: "center",
                textShadow: "0 1px 8px rgba(0,0,0,0.25)",
                lineHeight: 1.3,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error("Failed to generate OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
