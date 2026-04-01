type Option = {
  label: string;
  value: string;
};

type MaterialsFilterProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function MaterialsFilter({
  label,
  value,
  options,
  onChange,
}: MaterialsFilterProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      >
        <option value="">全てを選択</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
