import SidebarButton from "@/components/layout/SidebarButton";

type SidebarProps = {
  page: "search" | "archive" | "materials" | "settings";
  onChangePage: (page: "search" | "archive" | "materials" | "settings") => void;
};

export default function Sidebar({ page, onChangePage }: SidebarProps) {
  return (
    <aside className="hidden w-80 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 px-6 py-6">
        <p className="text-2xl font-black tracking-tight text-slate-950">
          ExamBoard
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          情報の収集から資料作成までを一度に
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-5">
        <SidebarButton
          label="試験情報"
          active={page === "search"}
          onClick={() => onChangePage("search")}
        />
        <SidebarButton
          label="アーカイブ"
          active={page === "archive"}
          onClick={() => onChangePage("archive")}
        />
        <SidebarButton
          label="資料生成"
          active={page === "materials"}
          onClick={() => onChangePage("materials")}
        />
        <SidebarButton
          label="設定"
          active={page === "settings"}
          onClick={() => onChangePage("settings")}
        />
      </nav>
    </aside>
  );
}
