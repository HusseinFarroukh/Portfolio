import { useState, useEffect } from 'react';
import Header from './Header.jsx';
import About from './About.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import Dashboard from './Dashboard.jsx';
import './index.css';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Listen for dashboard navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setShowDashboard(true);
        window.scrollTo(0, 0);
      } else {
        setShowDashboard(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showDashboard) {
    return (
      <div>
        <div className="sticky top-0 z-50 bg-black border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Project Manager</h1>
            <a
              href="#home"
              className="bg-red-300 text-black font-bold px-6 py-2 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300"
            >
              Back to Portfolio
            </a>
          </div>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <>
      <Header />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
