import { folders } from "@/lib/mock-data";

export default function LinkForm() {
  return (
    <section className="flex-1 p-6">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <h1 className="text-lg font-semibold text-gray-900">새 링크 등록</h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="url"
              className="text-sm font-medium text-gray-700"
            >
              링크 주소
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder"
              className="text-sm font-medium text-gray-700"
            >
              폴더
            </label>
            <select
              id="folder"
              name="folder"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            저장
          </button>
        </form>
      </div>
    </section>
  );
}
