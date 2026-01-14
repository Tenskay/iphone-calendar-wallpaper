export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0b16",
      color: "#e6ddff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      fontFamily: "system-ui"
    }}>
      API работает. Обои генерируются по /api/wallpaper
    </div>
  );
}
