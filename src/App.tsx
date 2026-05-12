import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { StandingsPage } from './pages/StandingsPage';
import { SchedulePage } from './pages/SchedulePage';
import { DriversPage } from './pages/DriversPage';
import { TeamsPage } from './pages/TeamsPage';
import { DriverDetailPage } from './pages/DriverDetailPage';
import { TeamDetailPage } from './pages/TeamDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/:id" element={<DriverDetailPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;