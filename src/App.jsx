import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import './index.css'; // Make sure styles are loaded

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="build" element={<Builder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
