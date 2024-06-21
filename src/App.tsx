import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LandingPage from './components/LandingPage';
import PageNotFound from './components/PageNotFound';
import ErrorBoundary from './components/ErrorBoundary';
import PunctuateApp from './components/PunctuationApp';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Punctuate" element={<PunctuateApp />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;