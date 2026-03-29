import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "@/components/layout/Sidebar";

type PageType = "search" | "archive" | "materials" | "settings";

function getPageFromPath(pathname: string): PageType {
  if (pathname.startsWith("/archive")) return "archive";
  if (pathname.startsWith("/materials")) return "materials";
  if (pathname.startsWith("/settings")) return "settings";
  return "search";
}

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = getPageFromPath(location.pathname);

  const handleChangePage = (page: PageType) => {
    if (page === "search") navigate("/search");
    if (page === "archive") navigate("/archive");
    if (page === "materials") navigate("/materials");
    if (page === "settings") navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar page={currentPage} onChangePage={handleChangePage} />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
