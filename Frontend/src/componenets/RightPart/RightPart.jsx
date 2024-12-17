import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Button from "@mui/material/Button";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';

const RightPart = () => {
    const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
    const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
    const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

    const handleChangeTheme= () => {
        console.log("handle change theme");
        
    }
  return (
    <div className='py-5 sticky top'>

        <div className='relative flex items-center'>
            <input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12'/>

            <div className='absolute top-0 left-0 pl-3 pt-3'>
                <SearchIcon className='text-gray-500 '/>
            </div>
            <Brightness6Icon onClick={handleChangeTheme} className='cursor-pointer ml-3'/>

        </div>

        <section className='my-5'>
            <h1 className='text-xl font-bold'>Go Premium</h1>
            <h1 className='font-bold'>Subscribe to unlock feature</h1><br />
            <Button 
            onClick={handleOpenSubscriptionModal}
                sx={{
                padding:"10px", 
                paddingX:"20px", 
                borderRadius:"25px", 
                bgcolor:"#2e2e2d", 
                color:"white"}} 
                varient='content'
                >
                    Get Premium
                </Button>
        </section>
        <section className='mt-7 space-y-5'>
            <h1 className='font-bold text-xl py-1'>What's happening</h1>
            <div>
                <p className='text-sm'>
                    FIFA Women's World Cup · LIVE
                </p>
                <p className='font-bold'>
                    Pilippines vs Switzerland
                </p>
            </div>

            {[1,1,1,].map((item)=><div className='flex justify-between w-full'>
                <div>
                    <p>Entertainment · Trending</p>
                    <p className='font-bold'>#TheMarvels</p>
                    <p>34.3k Reposts</p>
                </div>

                <MoreHorizIcon/>
            </div>)}

        </section>
        <section>
            <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}/>
        </section>
    </div>
  )
}

export default RightPart