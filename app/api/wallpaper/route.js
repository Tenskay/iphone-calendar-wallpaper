import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  const WIDTH = 1179;
  const HEIGHT = 2556;

  const SAFE_TOP = 320;
  const SAFE_BOTTOM = 160;

  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const months = [
    "ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ",
    "МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ",
    "СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ"
  ];

  const weekdays = ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];

  const holidays = {
    0: [1,2,3,4,5,6,7,8],
    1: [23],
    2: [8],
    4: [1,9],
    5: [12],
    10: [4]
  };

  const gridHeight = HEIGHT - SAFE_TOP - SAFE_BOTTOM;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #0e0b1f, #1a1338, #24194a)",
          display: "flex",
          flexDirection: "column",
          paddingTop: SAFE_TOP,
          paddingBottom: SAFE_BOTTOM,
          paddingLeft: 48,
          paddingRight: 48,
          fontFamily: "system-ui",
          color: "#e6ddff",
        }}
      >
        {/* Год */}
        <div
          style={{
            textAlign: "center",
            fontSize: 64,
            letterSpacing: 4,
            marginBottom: 32,
            opacity: 0.85,
          }}
        >
          {year}
        </div>

        {/* 12 месяцев */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 28,
            height: gridHeight,
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
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: 28,
                  padding: 20,
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Название месяца */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 28,
                    marginBottom: 10,
                    opacity: 0.9,
                  }}
                >
                  {monthName}
                </div>

                {/* Дни недели */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    fontSize: 18,
                    marginBottom: 6,
                    textAlign: "center",
                    opacity: 0.7,
                  }}
                >
                  {weekdays.map((w, i) => (
                    <div key={i} style={{ color: i === 6 ? "#ffb3d9" : "#cfc7ff" }}>
                      {w}
                    </div>
                  ))}
                </div>

                {/* Дни */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    rowGap: 6,
                    textAlign: "center",
                    fontSize: 22,
                  }}
                >
                  {Array.from({ length: firstDay - 1 }).map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const date = new Date(year, m, d);
                    let wd = date.getDay();
                    wd = wd === 0 ? 7 : wd;

                    const isSunday = wd === 7;
                    const isHoliday = holidays[m]?.includes(d);
                    const isToday = d === currentDay && m === currentMonth;
                    const isPast =
                      m < currentMonth ||
                      (m === currentMonth && d < currentDay);

                    let color = "#cfc7ff";
                    if (isSunday || isHoliday) color = "#ffb3d9";
                    if (isPast) color = "rgba(207,199,255,0.35)";
                    if (isPast && (isSunday || isHoliday))
                      color = "rgba(255,179,217,0.45)";

                    return (
                      <div
                        key={d}
                        style={{
                          position: "relative",
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color,
                        }}
                      >
                        {isToday && (
                          <div
                            style={{
                              position: "absolute",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "rgba(167,139,250,0.95)",
                            }}
                          />
                        )}
                        <span
                          style={{
                            position: "relative",
                            color: isToday ? "#ffffff" : color,
                          }}
                        >
                          {d}
                        </span>
                      </div>
                    );
                  })}
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
