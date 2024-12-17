import React from "react";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Avatar from "@mui/material/Avatar";
import avatar from "../Images/webbacklogo.png";
import { useNavigate } from "react-router-dom";
import img from "../Images/verifiedIcon.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PollIcon from "@mui/icons-material/Poll";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRePost, deletePost, likePost } from "../../Store/Tweet/Action";

const PostCard = ({item}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleOpenReply = () => {
    console.log("open model");
    handleClose();
  };

  const handleRePost = () => {
    dispatch(createRePost(item.id))
    console.log("create repost");
  };

  const handleLikePost = () => {
    dispatch(likePost(item.id))
  };

  return (
    <React.Fragment>
      {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
            <AllInclusiveIcon/>
            <p>You Repost</p>
        </div> */}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          alt="username"
          src={item?.user?.image}
          className="cursor-pointer"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer space-x-2 items-center">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
              <img src={img} alt="" className="ml-2 w-5 h-5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="cursor-pointer" onClick={()=>navigate(`/post/${item?.id}`)}>
              <p className="mb-2 p-0">
                {item?.content}
              </p>
              <img
                src={item?.image}
                alt=""
                className="w-[28rem] border border-gray-400  p-5 rounded-md"
              />
            </div>
          </div>

          <div className="py-5 flex flex-wrap justify-between items-center">
            <div className="space-x-3 flex items-center text-gray-600">
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModal}
              />
              <p>{item?.totalReplies}</p>
            </div>

            <div
              className={`${
                item?.rePost ? "text-pink-600" : "text-gray-600"
              } space-x-3 flex items-center`}
            >
              <AllInclusiveIcon
                className="cursor-pointer"
                onClick={handleRePost}
              />
              <p>{item?.totalReposts}</p>
            </div>

            <div
              className={`${
                item?.liked ? "text-pink-600" : "text-gray-600"
              } space-x-3 flex items-center`}
            >
              {item?.liked ? (
                <FavoriteIcon
                  className="cursor-pointer"
                  onClick={handleLikePost}
                />
              ) : (
                <FavoriteBorderIcon
                  className="cursor-pointer"
                  onClick={handleLikePost}
                />
              )}
              <p>{item?.totalLikes}</p>
            </div>

            <div className="space-x-3 flex items-center text-gray-600">
              <PollIcon className="cursor-pointer" onClick={handleOpenReply} />
              <p>43</p>
            </div>

            <div className="space-x-3 flex items-center text-gray-600">
              <AttachFileIcon
                className="cursor-pointer"
                onClick={handleOpenReply}
              />
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyModal}/>
      </section>
    </React.Fragment>
  );
};

export default PostCard;
