import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Context
import { BankingProvider } from './context/BankingContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Contact from './pages/Contact';

// Layout wrapper component
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard') ||
                          location.pathname.startsWith('/transfer');

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <BankingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </BankingProvider>
  );
}

export default App;
