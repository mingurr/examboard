import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [academyCode, setAcademyCode] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/search");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-[420px] rounded-[32px] bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            ExamBoard
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            情報の収集から資料作成までを一度に
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <input
              id="academyCode"
              type="text"
              value={academyCode}
              onChange={(event) => setAcademyCode(event.target.value)}
              placeholder="コードを入力してください"
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-base text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-violet-500 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-violet-600"
          >
            提出
          </button>
        </form>
      </div>
    </div>
  );
}
