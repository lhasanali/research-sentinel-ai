import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import MyLearningPage from './pages/MyLearningPage';
import SettingsPage from './pages/SettingsPage';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
    <Navigation />
    <main className="py-8">{children}</main>
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/dashboard',
      element: (
        <Layout>
          <DashboardPage />
        </Layout>
      ),
    },
    {
      path: '/courses',
      element: (
        <Layout>
          <CoursesPage />
        </Layout>
      ),
    },
    {
      path: '/my-learning',
      element: (
        <Layout>
          <MyLearningPage />
        </Layout>
      ),
    },
    {
      path: '/settings',
      element: (
        <Layout>
          <SettingsPage />
        </Layout>
      ),
    },
    {
      path: '*',
      element: (
        <Layout>
          <div className="text-center py-12">
            <div className="text-4xl mb-2">❌</div>
            <h2 className="text-3xl font-bold text-slate-300 mb-4">Page Not Found</h2>
            <p className="text-slate-400">The requested page does not exist.</p>
          </div>
        </Layout>
      ),
    },
  ],
  { basename: '/research-sentinel-ai' }
);

export default function App() {
  return <RouterProvider router={router} />;
}
