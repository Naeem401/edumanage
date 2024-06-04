import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home/Home'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AddClass from '../pages/Dashboard/Teacher/AddClass'
import MyClassesList from '../pages/Dashboard/Teacher/MyClassesList'
import AllClasses from '../pages/AllClasses/AllClasses/AllClasses'
import ClassDetails from '../pages/ClassDetails/ClassDetails'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
path: '/',
element: <Home/>
      },
      {
        path: '/all-class',
        element: <AllClasses/>
      },
      {
        path: '/class-details',
        element: <ClassDetails/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        path: 'manage-users',
        element: <ManageUsers/>
      },
      {
        path: 'add-class',
        element: <AddClass/>
      },
      {
        path: 'my-classes-list',
        element: <MyClassesList/>
      }
    ]
  }
])
