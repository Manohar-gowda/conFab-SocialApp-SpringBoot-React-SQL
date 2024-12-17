import React, { useEffect, useState } from 'react'
import {Avatar} from '@mui/material'
import avatar from '../Images/webbacklogo.png';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Button from '@mui/material/Button';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts} from '../../Store/Tweet/Action';
import { uploadCloud } from '../../Utils/UploadToCloudinary';

const validationSchema = Yup.object().shape ({
    content:Yup.string().required("Post text is required")
})

const HomeSection = () => {

    const [uploadingImage, setUploadingImage]=useState(false);
    const [selectedImage, setSelectedImage] = useState("")
    const dispatch = useDispatch();
    const {post} = useSelector(store => store);
    const {auth} = useSelector(store => store);

    console.log("Post: ",post);
    
    
    const handleSubmit=(values, actions) => {
      dispatch(createPost(values))
    //   actions.resetForm()
      console.log("Values:", values);
      setSelectedImage("")
      window.location.reload()
    }

    useEffect(() => { 
        dispatch(getAllPosts()); 
    }, [post.like, post.repost]);

    const formik = useFormik({
        initialValues:{
            content:"",
            image:"",
            isPost:true
        },
        onSubmit:handleSubmit,
        validationSchema
    })

    const handleImageSelect= async (event)=> {
        setUploadingImage(true);
        const imgUrl = await uploadCloud(event.target.files[0])
        formik.setFieldValue("image",imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    };

  return (
    <div className='space-y-5'>
        <section>
            <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>
        </section>
        <section className='pb-10'>
            <div className='flex space-x-5'>
                <Avatar alt="username" src={auth.user?.image}/>
                <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <input type="text" name="content" placeholder='What is happening' 
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
                        <div>
                     {selectedImage &&  <img src={selectedImage} alt="" />}
                    </div>
                    </form>
                </div>
            </div>
        </section>
        <section>
            {post.posts.map((item)=><PostCard item={item}/>)}
        </section>

    </div>
  )
}

export default HomeSection