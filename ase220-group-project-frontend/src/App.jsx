import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx';


const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/', element: <Home /> }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
