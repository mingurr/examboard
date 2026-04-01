type MaterialsButtonProps = {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
};

export default function MaterialsButton({
  active,
  title,
  description,
  onClick,
}: MaterialsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border px-5 py-5 text-left transition ${
        active
          ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-200"
          : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <p className="text-base font-bold">{title}</p>
      <p
        className={`mt-2 text-sm leading-6 ${
          active ? "text-violet-100" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </button>
  );
}
