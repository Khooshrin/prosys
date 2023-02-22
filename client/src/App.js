import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// import TEST from './pages/test'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import ProfLogin from './pages/ProfLogin';
import ProfSignup from './pages/ProfSignup';

function App() {
  const { user } = useAuthContext() //

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
            path="/"
            element={user ? <Home /> : <Navigate to='/student/login' />}
            />

            <Route
              path="/student/login"
              element={!user ? <StudentLogin /> : <Navigate to='/' />}
            />

            <Route
              path="/student/signup"
              element={!user ? <StudentSignup /> : <Navigate to='/' />}
            />

            <Route
              path="prof/login"
              element={!user ? <ProfLogin /> : <Navigate to='/' />}
            />

            <Route
              path="prof/signup"
              element={!user ? <ProfSignup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
