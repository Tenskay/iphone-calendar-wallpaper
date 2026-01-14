import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  const WIDTH = 1179;
  const HEIGHT = 2556;

  const today = new Date();
  const year = today.getFullYear();

  const months = [
    "ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ",
    "МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ",
    "СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ"
  ];

  const weekdays = ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          paddingTop: 200,
          paddingLeft: 40,
          paddingRight: 40,
          fontFamily: "system-ui",
          color: "#000000",
        }}
      >
        {/* Год */}
        <div
          style={{
            textAlign: "center",
            fontSize: 64,
            marginBottom: 40,
          }}
        >
          {year}
        </div>

        {/* Месяцы */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 24,
            flex: 1,
          }}
        >
          {months.map((monthName, m) => {
            const firstDayRaw = new Date(year, m, 1).getDay();
            const firstDay = firstDayRaw === 0 ? 7 : firstDayRaw;
            const daysInMonth = new Date(year, m + 1, 0).getDate();

            return (
              <div
                key={m}
                style={{
                  padding: 12,
                  border: "1px solid #000000",
                }}
              >
                {/* Название месяца */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginBottom: 8,
                  }}
                >
                  {monthName}
                </div>

                {/* Дни недели */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: 6,
                  }}
                >
                  {weekdays.map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>

                {/* Даты */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    rowGap: 4,
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {Array.from({ length: firstDay - 1 }).map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
