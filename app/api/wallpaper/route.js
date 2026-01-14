import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #0e0b16, #1a1333)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e6ddff",
          fontSize: 64,
          fontFamily: "system-ui",
        }}
      >
        PNG API работает
      </div>
    ),
    {
      width: 1179,
      height: 2556,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
