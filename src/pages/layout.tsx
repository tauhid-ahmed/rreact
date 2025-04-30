import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <Outlet />
    </div>
  );
}
