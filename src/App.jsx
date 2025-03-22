
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import Assessment from './pages/Assessment'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Room from './pages/Room';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path='/assesment' element={<Assessment />} />
      </Routes>

    </Router>
  );
}

export default App;
