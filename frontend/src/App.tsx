import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CardViewerPage } from './pages/CardViewerPage';
import { BattlePage } from './pages/BattlePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CardViewerPage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
