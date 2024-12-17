import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import bgimg from "../Images/backimg.png";
import { Avatar } from "@mui/material";
import avatar from "../Images/webbacklogo.png";
import Button from "@mui/material/Button";
import img from "../Images/verifiedIcon.png";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostCard from "../HomeSection/PostCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";

const Profile = () => {
  const {auth} = useSelector(store => store)

  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const dispatch = useDispatch();
  const {id} = useParams();
  

  const handleBack = () => navigate(-1);

  const handleFollowUser=()=> {
    dispatch(followUserAction(id));
    // console.log("open profile model");
  }

  const [tabvalue, setTabValue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)

    if(newValue === 4) {
        console.log("likes post");
    } else if(newValue === 1) {
        console.log("users post");
        
    }
  };

  useEffect(()=> {
    dispatch(findUserById(id))
  },[id])


  return (
    <div>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img src={bgimg} alt="" className="w-[100%] h-[15rem] object-cover" />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="Code with Sujay"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth.findUser?.req_user ? <Button
          onClick={handleOpenProfileModal}
          className="rounded-full"
            sx={{
              padding:"10px",
              paddingX:"20px",
              borderRadius:"25px", 
              bgcolor:"#2e2e2d", 
              color:"white"
            }}
            varient="content"
          >
            Edit Profile
          </Button> : <Button
          onClick={handleFollowUser}
          className="rounded-full"
            sx={{
              padding:"10px",
              paddingX:"20px",
              borderRadius:"25px", 
              bgcolor:"#2e2e2d", 
              color:"white"
            }}
            varient="content"
          >
            {auth?.followed ? "Follow" : "Unfollow"}
          </Button>}
        </div>

        <div className="">
            <div>
                <div className="item-center flex">
                    <h1 className='text-lg font-bold'>{auth.findUser?.fullName}</h1>
                    {true && (<img src={img} alt="" className="ml-2 w-5 h-5" />)}
                </div>
                <h1 className="text-gray-500">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
            </div>

            <div className="mt-2 space-y-3">
                <p>{auth.findUser?.bio}</p>
                <div className="py-1 flex space-x-5">
                    <div className="flex items-center text-gray-500">
                        <BusinessCenterIcon />
                        <p className="ml-2">Education</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <LocationOnIcon />
                        <p className="ml-2">{auth.findUser?.location}</p>
                    </div>

                    <div className="flex items-center text-gray-500">
                        <CalendarMonthIcon />
                        <p className="ml-2">Joined December 2024</p>
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    <div className="flex items-center space-x-1 font-bold">
                        <span>{auth.findUser?.following.length}</span>
                        <span className="text-gray-500 ">Followers</span>
                    </div>
                    <div className="flex items-center space-x-1 font-bold">
                        <span>{auth.findUser?.followers.length}</span>
                        <span className="text-gray-500">Following</span>
                    </div>
                </div>
            </div>
            
        </div>
      </section>

      <section className="py-5">
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabvalue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Replies" value="2" />
            <Tab label="Media" value="3" />
            <Tab label="Likes" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {[1,1,1,1].map((item => <PostCard/>))}
        </TabPanel>
        <TabPanel value="2">users replies</TabPanel>
        <TabPanel value="3">Media</TabPanel>
        <TabPanel value="4">Likes</TabPanel>
      </TabContext>
    </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModal}/>
      </section>
    </div>
  );
};

export default Profile;
