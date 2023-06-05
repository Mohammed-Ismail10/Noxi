import React, { useState } from 'react'
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emptyUserData } from '../../Redux/LoginSlice.js';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  let { userData } = useSelector(({ login }) => login);
  let dispatch = useDispatch();



  return (
    <>
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        className='d-block d-sm-none text-center'
      >
        <Link to={`/`} className='py-3 text-decoration-none text-white fs-5 d-block bg-dark'>
          Noxi
        </Link>
        <hr className='m-0 text-white' />
        <ul class="navbar-nav h-100 bg-dark">
          {userData ? <>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="movies">Movies</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="tv">Tvshow</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="persons">Persons</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="login" onClick={()=>dispatch(emptyUserData())}>Logout</Link>
            </li>
          </> : <><li class="nav-item">
            <Link class="nav-link text-white py-3" to="register">Register</Link>
          </li>
            <li class="nav-item">
              <Link class="nav-link text-white py-3" to="login">Login</Link>
            </li></>}



        </ul>
      </Drawer>

      <nav className='navbar navbar-expand-lg bg-dark shadow-sm fixed-top navbar-dark'>
        <div className="container-fluid">
          <Toolbar className='ps-0 w-100'>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className='d-sm-none text-white'
            >
              <MenuIcon />
            </IconButton>
            <Link className="navbar-brand text-primary" to="/">
              Noxi
            </Link>
            <div className='d-none d-sm-block w-100'>
              <div className='d-flex justify-content-between'>
                <ul class="navbar-nav flex-row">
                  {userData ? <><li class="nav-item">
                    <Link class="nav-link text-white mx-1" to="/">Home</Link>
                  </li>
                    <li class="nav-item">
                      <Link class="nav-link text-white mx-1" to="movies">Movies</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link text-white mx-1" to="tv">Tvshow</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link text-white mx-1" to="persons">Persons</Link>
                    </li>
                    </> : null}


                </ul>
                <ul class="navbar-nav flex-row">
                  {userData ? <li class="nav-item">
                    <Link class="nav-link text-white mx-1" to="login" onClick={()=>dispatch(emptyUserData())}>Logout</Link>
                  </li> : <><li class="nav-item">
                    <Link class="nav-link text-white mx-1" to="register">Register</Link>
                  </li>
                    <li class="nav-item">
                      <Link class="nav-link text-white mx-1" to="login">Login</Link>
                    </li></>}


                </ul>
              </div>

            </div>
          </Toolbar>
        </div>
      </nav>
    </>
  )
}
