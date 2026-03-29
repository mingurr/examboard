type SidebarButtonProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function SidebarButton({
  label,
  active = false,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-5 py-3.5 text-left text-base font-semibold transition ${
        active
          ? "bg-violet-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}
