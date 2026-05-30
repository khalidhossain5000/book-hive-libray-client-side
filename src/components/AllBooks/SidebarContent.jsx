import { Search, X, Library, Hash } from "lucide-react";

const SidebarContent = ({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
  categories,
  books,
  filteredBooks,
}) => (
  <div className="flex flex-col gap-6">
    {/* Search */}
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Search
      </label>
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Title, author, keyword…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </div>

    <div className="h-px bg-slate-100 dark:bg-slate-800" />

    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Category
        </label>
        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-xs font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {categories.map((cat) => {
          const active = cat === selectedCategory;
          const count =
            cat === "All"
              ? books.length
              : books.filter((b) => b.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                active
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash
                  size={12}
                  className={active ? "text-teal-200" : "text-slate-400"}
                />
                <span className="font-medium">{cat}</span>
              </div>
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  active
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    <div className="h-px bg-slate-100 dark:bg-slate-800" />

    <div className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 dark:from-teal-950/40 dark:to-cyan-950/40">
      <div className="flex items-center gap-2 mb-3">
        <Library size={14} className="text-teal-600 dark:text-teal-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-400">
          Quick Stats
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {filteredBooks.length} books
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Total
          </span>
          <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
            {books.length} books
          </span>
        </div>
        {selectedCategory !== "All" && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Filter
            </span>
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 truncate max-w-[120px]">
              {selectedCategory}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SidebarContent;
