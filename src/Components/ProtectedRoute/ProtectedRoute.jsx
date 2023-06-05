import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../Redux/LoginSlice.js';

export default function ProtectedRoute({ children }) {

  let dispatch = useDispatch();

  useEffect(()=>{
    dispatch(saveUserData())
  },[])

  if (localStorage.getItem('token') !== null) {
    return children;
  }
  else {
    return <Navigate to={'/login'} />
  }
}
