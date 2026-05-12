import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-carbon-900">
      <Sidebar />
      {/* main content offset by sidebar width on desktop */}
      <main className="lg:pl-56 pb-16 lg:pb-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
