import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from '../HomeSection/PostCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, findPostsById } from '../../Store/Tweet/Action';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";


const PostDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {post} = useSelector(store => store)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(()=> {
      if(id) {
        dispatch(findPostsById(id))
      }
    },[])

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    

    const handleDeletePost = () => {
      dispatch(deletePost(id))
      console.log("delete");
      handleClose();
    };

  return (
    <React.Fragment>
        <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Post
        </h1>
      </section>

      <section>
        <div className="flex">
          <div>
            <PostCard item={post.post}/>
          </div>
        
        <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon sx={{ color: "#2e2e2d" }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                  sx: {
                    backgroundColor: "#3b3b3b",
                    color: "white",
                    py: "0px",
                  },
                }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
              </Menu>
            </div>
        </div>
        
        <Divider sx={{margin:"2rem 0rem"}}/>
      </section>

      <section>
        {post.post?.replyPosts.map((item)=><PostCard item={item}/>)}
      </section>

    </React.Fragment>
  )
}

export default PostDetails