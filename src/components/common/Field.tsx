type FieldProps = {
  label: string;
  value: string;
};

export default function Field({ label, value }: FieldProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-5 border-b border-slate-100 py-4 text-base last:border-b-0">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
}
