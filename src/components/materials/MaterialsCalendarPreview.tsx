import SectionCard from "@/components/common/SectionCard";
import type { ExamRecord } from "@/types/exam";

type MaterialsCalendarPreviewProps = {
  calendarEvents: ExamRecord[];
};

const schoolColorMap: Record<
  string,
  { bg: string; border: string; text: string; pill: string }
> = {
  桜丘中学校: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    pill: "bg-rose-100",
  },
  青葉中学校: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    pill: "bg-sky-100",
  },
  白鳥中学校: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    pill: "bg-emerald-100",
  },
  星川高等学校: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    pill: "bg-amber-100",
  },
  明成高等学校: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    text: "text-fuchsia-700",
    pill: "bg-fuchsia-100",
  },
  東陵高等学校: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    pill: "bg-indigo-100",
  },
};

function getSchoolColorClasses(school: string) {
  return (
    schoolColorMap[school] ?? {
      bg: "bg-slate-50",
      border: "border-slate-200",
      text: "text-slate-700",
      pill: "bg-slate-100",
    }
  );
}

function CalendarLegendItem({ school }: { school: string }) {
  const colors = getSchoolColorClasses(school);

  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span
        className={`inline-flex rounded-full px-2.5 py-1 font-semibold ${colors.pill} ${colors.text}`}
      >
        {school}
      </span>
    </div>
  );
}

function CalendarEventChip({
  school,
  grade,
  subject,
}: {
  school: string;
  grade: string;
  subject: string;
}) {
  const colors = getSchoolColorClasses(school);

  return (
    <div
      className={`rounded-md border px-3 py-2.5 text-[11px] leading-5 text-slate-700 ${colors.bg} ${colors.border}`}
    >
      <p className={`font-semibold ${colors.text}`}>{school}</p>
      <p>
        {grade} · {subject}
      </p>
    </div>
  );
}

export default function MaterialsCalendarPreview({
  calendarEvents,
}: MaterialsCalendarPreviewProps) {
  const calendarDateMap = new Map<string, ExamRecord[]>();

  calendarEvents.forEach((event) => {
    const current = calendarDateMap.get(event.examDate) ?? [];
    calendarDateMap.set(event.examDate, [...current, event]);
  });

  const calendarDays = [
    { key: "2026-04-01", day: 1 },
    { key: "2026-04-02", day: 2 },
    { key: "2026-04-03", day: 3 },
    { key: "2026-04-04", day: 4 },
    { key: "2026-04-05", day: 5 },
    { key: "2026-04-06", day: 6 },
    { key: "2026-04-07", day: 7 },
    { key: "2026-04-08", day: 8 },
    { key: "2026-04-09", day: 9 },
    { key: "2026-04-10", day: 10 },
    { key: "2026-04-11", day: 11 },
    { key: "2026-04-12", day: 12 },
    { key: "2026-04-13", day: 13 },
    { key: "2026-04-14", day: 14 },
    { key: "2026-04-15", day: 15 },
    { key: "2026-04-16", day: 16 },
    { key: "2026-04-17", day: 17 },
    { key: "2026-04-18", day: 18 },
    { key: "2026-04-19", day: 19 },
    { key: "2026-04-20", day: 20 },
    { key: "2026-04-21", day: 21 },
    { key: "2026-04-22", day: 22 },
    { key: "2026-04-23", day: 23 },
    { key: "2026-04-24", day: 24 },
    { key: "2026-04-25", day: 25 },
    { key: "2026-04-26", day: 26 },
    { key: "2026-04-27", day: 27 },
    { key: "2026-04-28", day: 28 },
    { key: "2026-04-29", day: 29 },
    { key: "2026-04-30", day: 30 },
  ];

  return (
    <SectionCard
      title="試験情報カレンダー"
      action={
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            2026年 4月
          </button>
        </div>
      }
    >
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Monthly Calendar
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              2026年 4月
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              登録された学校の試験日程を一つの月間ビューで確認します。
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
            >
              ← 前月
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
            >
              次月 →
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Legend</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(schoolColorMap).map((school) => (
              <CalendarLegendItem key={school} school={school} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
            {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
              <div key={day} className="rounded-xl bg-white px-2 py-3">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`blank-start-${idx}`}
                className="min-h-[160px] rounded-xl border border-transparent bg-transparent"
              />
            ))}

            {calendarDays.map((day) => {
              const events = calendarDateMap.get(day.key) ?? [];

              return (
                <div
                  key={day.key}
                  className="min-h-[160px] rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">
                      {day.day}
                    </p>
                    {events.length > 0 && (
                      <span className="rounded-xl bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">
                        {events.length}件
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    {events.slice(0, 2).map((event) => (
                      <CalendarEventChip
                        key={event.id}
                        school={event.school}
                        grade={event.grade}
                        subject={event.subject}
                      />
                    ))}

                    {events.length > 2 && (
                      <div className="rounded-lg bg-slate-100 px-2.5 py-2 text-[11px] font-semibold text-slate-600">
                        + {events.length - 2}件 More
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
