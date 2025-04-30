import { Routes, Route } from "react-router";
import { BlogPage } from "./pages/blog-page";
import { HomePage } from "./pages/home";
import RootLayout from "./pages/layout";

export function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Route>
    </Routes>
  );
}
