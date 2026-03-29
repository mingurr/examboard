type FileBoxProps = {
  fileName?: string;
  onDownload?: () => void;
};

export default function FileBox({ fileName, onDownload }: FileBoxProps) {
  const hasFile = Boolean(fileName?.trim());

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="truncate text-sm text-slate-700">
        {hasFile ? fileName : "-"}
      </span>

      <button
        type="button"
        onClick={onDownload}
        disabled={!hasFile}
        className="ml-3 shrink-0 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ダウンロード
      </button>
    </div>
  );
}
