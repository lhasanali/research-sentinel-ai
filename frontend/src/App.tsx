import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-bold text-cyan-400 mb-4">مختبر الذكاء</h1>
            <p className="text-xl text-slate-300 mb-8">Hasan Al-Yasiri Technology Lab</p>
            <p className="text-slate-400 mb-6">
              A production-ready learning management system for vocational students in computer networks, cybersecurity, 
              hardware, motherboards, microprocessors, and operating systems.
            </p>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>Phase 1: Frontend scaffold complete</p>
              <p className="text-cyan-400">Next: Phase 2 – UI and features</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      path: '*',
      element: (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-300 mb-4">Page Not Found</h2>
            <p className="text-slate-400">The requested page does not exist yet.</p>
          </div>
        </div>
      ),
    },
  ],
  { basename: '/research-sentinel-ai' }
);

export default function App() {
  return <RouterProvider router={router} />;
}
