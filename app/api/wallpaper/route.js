import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  // iPhone 15
  const WIDTH = 1179;
  const HEIGHT = 2556;

  // Safe zones под часы и нижнюю панель
  const SAFE_TOP = 320;
  const SAFE_BOTTOM = 180;

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

  // Праздники РФ
  const holidays = {
    0: [1,2,3,4,5,6,7,8],
    1: [23],
    2: [8],
    4: [1,9],
    5: [12],
    10: [4]
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg,#f2ecff,#e7ddff,#dcd1ff)",
          display: "flex",
          flexDirection: "column",
          paddingTop: SAFE_TOP,
          paddingBottom: SAFE_BOTTOM,
          paddingLeft: 40,
          paddingRight: 40,
          fontFamily: "system-ui",
          color: "#3a2f5c",
        }}
      >
        {/* Год */}
        <div
          style={{
            textAlign: "center",
            fontSize: 64,
            marginBottom: 28,
            letterSpacing: 3,
            opacity: 0.85,
          }}
        >
          {year}
        </div>

        {/* Сетка месяцев */}
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
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(120,90,200,0.25)",
                  borderRadius: 22,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Название месяца */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    marginBottom: 6,
                    letterSpacing: 1,
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
                    opacity: 0.7,
                  }}
                >
                  {weekdays.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        color: i === 6 ? "#c23b7a" : "#5a4b87",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Даты */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    rowGap: 6,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  {/* Пустые ячейки */}
                  {Array.from({ length: firstDay - 1 }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const date = new Date(year, m, d);
                    let wd = date.getDay();
                    wd = wd === 0 ? 7 : wd;

                    const isSunday = wd === 7;
                    const isHoliday = holidays[m]?.includes(d);
                    const isToday =
                      d === currentDay && m === currentMonth;

                    const isPast =
                      m < currentMonth ||
                      (m === currentMonth && d < currentDay);

                    // Цвета
                    let color = "#4a3f6b";

                    if (isSunday || isHoliday) {
                      color = "#c23b7a";
                    }

                    if (isPast) {
                      color =
                        isSunday || isHoliday
                          ? "rgba(194,59,122,0.45)"
                          : "rgba(74,63,107,0.35)";
                    }

                    return (
                      <div
                        key={d}
                        style={{
                          position: "relative",
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isToday && (
                          <div
                            style={{
                              position: "absolute",
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: "#7b5cff",
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
