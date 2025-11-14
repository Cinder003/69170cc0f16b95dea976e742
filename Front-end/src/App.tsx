import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProspectsPage from './pages/ProspectsPage';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 font-sans">
        <Header />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<ProspectsPage />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: 'linear-gradient(to right, #10b981, #34d399)',
                color: 'white',
              },
            },
            error: {
              style: {
                background: 'linear-gradient(to right, #ef4444, #f87171)',
                color: 'white',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;