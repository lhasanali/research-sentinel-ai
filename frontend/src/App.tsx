import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className="min-h-screen" />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
