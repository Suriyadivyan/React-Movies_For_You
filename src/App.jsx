import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Booking from './pages/Booking'
import ProtectedRoute from './route/ProtectedRoute'
import AdminRoute from './route/AdminRoute'
import Admin from './pages/Admin'


const App = () => {
  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'booking/:id',
          element: (
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          )
        },
        {
          path:'admin',
          element:(
            <AdminRoute>
              <Admin />
            </AdminRoute>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={myRouter} />
}

export default App
