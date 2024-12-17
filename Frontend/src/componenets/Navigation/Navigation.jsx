import React from "react";
import Mlogo from "../Images/Mlogo.png";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import avatar from "../Images/webbacklogo.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {
  const {auth} = useSelector(store => store)

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logout");
    handleClose();
    dispatch(logout())
  };
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-1">
          <img src={Mlogo} height="90" width="90" alt="" />
        </div>
        <div className="space-y-3">
          {navigationMenu.map((item) => (
            <div
              className="cursor-pointer items-center flex space-x-3"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${auth.user?.id}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#2e2e2d",
            }}
            variant="contained"
            color="primary"
          >
            Create Blog
          </Button>
        </div>
      </div>

      <div className="flex item-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar alt="username" src={auth.user?.image} sx={{ width: 56, height: 56 }} />
          <div>
            <span>{auth.user?.fullName}</span>
            <br />
            <span className="opacity-70">@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
          </div>
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
                backgroundColor: "#2e2e2d",
                color: "white",
                py: "0px",
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
