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
import UpdateClass from '../pages/Dashboard/Teacher/UpdateClass/UpdateClass'
import ClassDetails from '../pages/Dashboard/Teacher/ClassDetails'
import TeacherRequestshandle from '../pages/Dashboard/Admin/TeacherRequestshandle'
import TeachPage from '../pages/TeachPage'
import PrivateRoute from './PrivateRoute'
import AllClasses from '../pages/Dashboard/Admin/AllClasses'
import AllClassesByStudent from '../pages/AllClasses/AllClasses/AllClassesByStudent'
import ClassDetailsForStudent from '../pages/ClassDetails/ClassDetailsForStudent'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import MyEnrollClasses from '../pages/Dashboard/Student/MyEnrollClasses'
import MyEnrollClassDetails from '../pages/Dashboard/Student/MyEnrollClassDetails'
import AdminRoute from './AdminRoute'
import TeacherRoute from './TeacherRoute'
import UserInfo from '../pages/Dashboard/UserInfo'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/all-classes-for-student',
        element: <AllClassesByStudent />
      },
      {
        path: '/class-details-for-student/:id',
        element: <PrivateRoute><ClassDetailsForStudent /></PrivateRoute>
      },
      {
        path: '/payment/:id',
        element: <PaymentPage />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/class/${params.id}`)

      },
      {
        path: '/teach',
        element: <PrivateRoute><TeachPage /></PrivateRoute>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><UserInfo/></PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
      },
      {
        path: 'admin-get-all-classes',
        element: <PrivateRoute><AdminRoute><AllClasses /></AdminRoute></PrivateRoute>
      },
      {
        path: 'teacher-requests-handle',
        element: <PrivateRoute><AdminRoute><TeacherRequestshandle /></AdminRoute></PrivateRoute>
      },
      {
        path: 'add-class',
        element: <PrivateRoute><TeacherRoute><AddClass /></TeacherRoute></PrivateRoute>
      },
      {
        path: 'my-classes-list',
        element: <PrivateRoute><TeacherRoute><MyClassesList /></TeacherRoute></PrivateRoute>
      },
      {
        path: 'update-class/:id',
        element: <PrivateRoute><TeacherRoute><UpdateClass /></TeacherRoute></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/class/${params.id}`)
      },
      {
        path: 'class-details/:id',
        element: <PrivateRoute><TeacherRoute><ClassDetails /></TeacherRoute></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/class/${params.id}`)
      },
      {
        path: 'myenroll-classes',
        element: <PrivateRoute><MyEnrollClasses/></PrivateRoute>
      },
      {
        path: 'myenroll-class/:id',
        element: <PrivateRoute><MyEnrollClassDetails/></PrivateRoute>
      }
    ]
  }
])
