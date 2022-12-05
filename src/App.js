import { Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
