import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function SectionCard({
  title,
  children,
  action,
}: SectionCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
