import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Login from './Components/Login/Login.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';
import { ToastContainer } from 'react-toastify';
import Movies from './Components/Movies/Movies.jsx';
import TV from './Components/TV/TV.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ItemDetails from './Components/ItemDetails/ItemDetails.jsx';
import Persons from './Components/People/Persons.jsx';


function App() {



  return (
    <>
      <Provider store={store}>
        <ToastContainer position="top-left" theme="dark" />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='/movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
              <Route path='/tv' element={<ProtectedRoute><TV /></ProtectedRoute>} />
              <Route path='/persons' element={<ProtectedRoute><Persons /></ProtectedRoute>} />
              <Route path='/itemdetails/:mediaType/:id' element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;