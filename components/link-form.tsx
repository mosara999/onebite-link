import { folders } from "@/lib/mock-data";

export default function LinkForm() {
  return (
    <section className="flex-1 px-6 pt-10 pb-6">
      <div className="mx-auto flex max-w-lg flex-col gap-8">
        <h1 className="text-[30px] leading-tight font-bold text-[var(--text)]">
          새 링크 등록
        </h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="url"
              className="text-sm font-medium text-[var(--text)]"
            >
              링크 주소
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="folder"
              name="folder"
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white"
          >
            저장
          </button>
        </form>
      </div>
    </section>
  );
}
