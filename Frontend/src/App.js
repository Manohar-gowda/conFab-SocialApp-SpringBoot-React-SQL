import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './componenets/HomePage/HomePage';
import Authentication from './componenets/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';

const App = () => {
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  },[jwt, dispatch]);
  console.log(auth);
  return (
    <div>
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
};

export default App;
