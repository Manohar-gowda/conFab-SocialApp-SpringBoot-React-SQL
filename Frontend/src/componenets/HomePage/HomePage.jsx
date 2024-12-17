import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Mlogo from "../Images/Mlogo.png";
import RightPart from "../RightPart/RightPart";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetails/PostDetails";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    //  <Grid container  xs={12} className='px-5 lg:px-36 justify-between'>

    //     <Grid xs={0} lg={2.5} className='hidden lg:block w-full relative'>
    //       <Navigation/>
    //     </Grid>

    //     <Grid xs={12} lg={6} className='hidden lg:block w-full relative'>
    //         <HomeSection/>
    //     </Grid>

    //     <Grid xs={0} lg={3} className='hidden lg:block w-full relative'>
    //           <p className='text-center'>right</p>
    //     </Grid>

    //  </Grid>
    <div className="px-5 lg:px-36">
      <div className="py-1 flex items-center">
        {/* <img src={Mlogo} height="90" width="90" alt="Logo" /> */}
        {/* <section className="ml-4"> 
 <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>  
 </section>   */}
        <div className="flex ml-auto lg:hidden">
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isSidebarOpen ? (
              <CloseIcon className="h-6 w-6 text-black" />
            ) : (
              <MenuIcon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div
          className={`lg:w-2/12 w-full lg:block ${
            isSidebarOpen ? "block" : "hidden"
          } relative`}
        >
          <Navigation />
        </div>
        <div className="lg:w-6/12 w-full relative">

        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/home" element={<HomeSection />}></Route>
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/post/:id" element={<PostDetails/>}></Route>
        </Routes>
          
        </div>
        <div className="lg:w-3/12 w-full hidden lg:block relative">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
