import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import ViewNote from './pages/ViewNote.jsx';


const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/', element: <Home /> },
  { path: '/viewnote/:id', element: <ViewNote />}
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
