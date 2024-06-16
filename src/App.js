// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Account/Register';
import Home from './Pages/Home';
import Login from './Account/Login';
import { check_token } from './Slices/Auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProfileDetails from './Account/ProfileDetails';
import AddProduct from './Pages/AddProduct';
import AllProducts from './Pages/AllProducts';
import ProductDetails from './Pages/ProductDetails';
import UpdateProduct from './Pages/UpdateProduct';
import LoginMutation from './Account/LoginMutation';


// Create a client
const queryClient = new QueryClient()

function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    return token !== "" && token !== null && token !== undefined ? (
      children) :
      (<><Navigate to="/login" />
      </>)
  }

  const PublicRoute = [
    { path: "/reg", component: <Register /> },
    { path: "/login", component: <Login /> },
    { path: "/loginpage", component: <LoginMutation /> },
    // { path: "/", component: <Home /> },
  ]
  const ProtectedRoute = [

    { path: "/", component: <Home /> },
    { path: "/profiledetails", component: <ProfileDetails /> },
    { path: "/addproduct", component: <AddProduct /> },
    { path: "/allproducts", component: <AllProducts /> },
    { path: "/productdetails/:id", component: <ProductDetails /> },
    { path: "/updateproduct/:id", component: <UpdateProduct /> },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(check_token())
  }, [])



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* // Provide the client to your App */}

      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {
              PublicRoute.map((item, index) => {
                return (
                  <>
                    <Route key={index} path={item.path} element={item.component} />
                  </>
                )
              })
            }
            {
              ProtectedRoute.map((item, index) => {
                return (
                  <>
                    <Route key={index} path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
                  </>
                )
              })
            }
          </Routes>
        </Router>
      </QueryClientProvider>


    </>
  );
}

export default App;
