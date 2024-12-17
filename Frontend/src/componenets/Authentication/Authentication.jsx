import { Grid2, Button } from '@mui/material'
import React, { useState } from 'react'
import backImg from "../Images/webbacklogo.png"
import { GoogleLogin } from '@react-oauth/google'
import AuthModal from './AuthModal';

const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal=() => setOpenAuthModal(true);
  const handleCloseAuthModal=() => setOpenAuthModal(false);

  return ( 
    <div> 
      <Grid2 className="overflow-hidden" container>

        <Grid2 className='hidden lg:block w-[60%]' item lg={7} >
          <img src={backImg} alt="" className='w-full h-screen' />
        </Grid2>

        <Grid2 className='px-10 mt-7' lg={7} xm={12} >
            {/* <h1 className='font-bold text-4xl'>Start Fabulous Conversations....</h1> */}

            <div className='w-[60%] text-center ml-11'>
              <div className='w-full'>
              <h1 className='font-bold text-4xl py-16'>Join ConFab Today</h1>

                <GoogleLogin className='w-full h-10'/>
                <p className='py-5 text-center'>OR</p>
                <Button variant="content" size="large" 
                fullWidth 
                onClick={handleOpenAuthModal}
                sx={{
                  borderRadius:"29px",
                  py:"7px",
                  bgcolor:"#2e2e2d", 
                  color:"white"
                }}>
                  Create Account
                </Button>
                <p className='text-sm mt-2'>By signing up. you agree to the Terms of service and Privacy Policy, including Cookie Use.</p>

              </div >
              <div className='mt-10'>
                <h1 className='font-bold text-xl mb-5'>Already have Account?</h1>
              <Button variant="outlined" 
              size="large" 
                fullWidth 
                onClick={handleOpenAuthModal}
                sx={{
                  borderRadius:"29px",
                  py:"7px",
                  borderColor: '#2e2e2d', 
                  color:"#2e2e2d", 
                  '&:hover': { bgcolor: '#2e2e2d', color: "white"}
                }}>
                  Login
                </Button>
              </div>
            </div>
        </Grid2>
      </Grid2>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
    </div>
  )
}

export default Authentication