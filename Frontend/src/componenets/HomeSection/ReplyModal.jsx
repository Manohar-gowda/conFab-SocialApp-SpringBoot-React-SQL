import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Avatar} from '@mui/material'
import avatar from '../Images/webbacklogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import img from "../Images/verifiedIcon.png";
import { useDispatch } from 'react-redux';
import { createPostReply } from '../../Store/Tweet/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:'none',
  borderRadius:4
};


export default function ReplyModal({open, handleClose, item}) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadingImage, setUploadingImage]=useState(false);
    const [selectedImage, setSelectedImage] = useState("")

    const handleSubmit=(values) => {
      dispatch(createPostReply(values))
      handleClose();
      console.log("Values:", values);
    }

    const formik = useFormik({
        initialValues:{
            content:"",
            image:"",
            postId:item?.id
        },
        onSubmit:handleSubmit
    })

    const handleImageSelect=(event)=> {
        setUploadingImage(true);
        const imgUrl = event.target.files[0]
        formik.setFieldValue("image",imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          alt="username"
          src={avatar}
          className="cursor-pointer"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer space-x-2 items-center">
              <span className="font-semibold">SujaCodes</span>
              <span className="text-gray-600">@codewithSujay . 2m</span>
              <img src={img} alt="" className="ml-2 w-5 h-5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="cursor-pointer" onClick={()=>navigate(`/post/${3}`)}>
              <p className="mb-2 p-0">
                full stack project social-app spring-boot and react
              </p>
            </div>
          </div>
        </div>
      </div><br />

        <div className='flex space-x-5'>
                <Avatar alt="username" src={avatar}/>
                <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <input type="text" name="content" placeholder='Content write something...' 
                            className='border-none outline-none text-xl bg-transparent'
                            {...formik.getFieldProps("content")}/>
                            {formik.errors.content && formik.touched.content && (
                                <span className='text-red-500'>{formik.errors.content}</span>
                            )}
                        </div>
                        {/* <div className=''>
                            <img src="" alt="" />
                        </div> */}
                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex space-x-5 items-center'>
                                <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                <ImageIcon className='text-[#2e2e2d]'/>
                                <input 
                                type="file" 
                                name='imageFile' 
                                className='hidden' 
                                onChange={handleImageSelect}/>
                                </label>
                                <FmdGoodIcon className='text-[#2e2e2d]'/>
                                <TagFacesIcon className='text-[#2e2e2d]'/>
                            </div>    
                               <div>
                                    <Button  
                                        sx={{
                                            width:"100%", 
                                            borderRadius:"20px", 
                                            paddingX:"20px",
                                            paddingY:"8px", 
                                            bgcolor:"#2e2e2d",
                                        }}  
                                        variant="contained" 
                                        type='submit'
                                    >
                                        Blog
                                    </Button>
                                </div>
                        </div>
                    </form>
                </div>
                </div>
        </Box>
      </Modal>
    </div>
  );
}