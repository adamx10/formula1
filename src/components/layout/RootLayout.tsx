import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export function RootLayout() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-carbon-900 flex flex-col">
      <Sidebar />
      {/* main content offset by sidebar width on desktop */}
      <main className="lg:pl-56 pb-16 lg:pb-0 flex-1 flex flex-col">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
