import { Bell, Search, UserCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-24 max-w-[1840px] items-center gap-10 px-6">
          <div className="text-3xl font-bold text-sky-600">Azure Meridian</div>

          <nav className="flex h-full items-center gap-8 text-xl text-slate-700">
            <a className="flex h-full items-center hover:text-sky-600" href="#">
              Find Pros
            </a>
            <a
              className="flex h-full items-center border-b-2 border-sky-600 text-sky-600"
              href="#"
            >
              Services
            </a>
            <a className="flex h-full items-center hover:text-sky-600" href="#">
              Projects
            </a>
            <a className="flex h-full items-center hover:text-sky-600" href="#">
              Support
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-8">
            <label className="flex h-14 w-[380px] items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-slate-500">
              <Search className="h-6 w-6" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-lg outline-none placeholder:text-slate-500"
                placeholder="Search services..."
                type="search"
              />
            </label>

            <button
              className="cursor-pointer text-slate-700 hover:text-sky-600"
              type="button"
            >
              <Bell className="h-7 w-7 fill-current" aria-hidden="true" />
            </button>
            <button
              className="cursor-pointer text-slate-700 hover:text-sky-600"
              type="button"
            >
              <UserCircle className="h-8 w-8 fill-slate-200" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
