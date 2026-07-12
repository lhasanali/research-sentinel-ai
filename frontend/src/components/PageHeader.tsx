interface PageHeaderProps {
  title: string;
  description: string;
  icon: string;
}

const PageHeader = ({ title, description, icon }: PageHeaderProps) => (
  <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div className="inline-flex items-center gap-3 rounded-full bg-slate-800 px-4 py-2 text-slate-200 text-sm font-semibold tracking-wide">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
    </div>
  </div>
);

export default PageHeader;
