import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import bgimg from "../Images/bgimgss.png";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import avatar from "../Images/webbacklogo.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { uploadCloud } from "../../Utils/UploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ProfileModal({open, handleClose}) {
  // const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState("");
  const {auth} = useSelector(store => store)
  


  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values))
    console.log("handle submit", values);
    setSelectedImage("");
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      webSite: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = async(event) => {
    setUploading(true);
    const { name } = event.target;
    const file = await uploadCloud(event.target.files[0])
    formik.setFieldValue(name, file);
    setSelectedImage(file);
    setUploading(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}  aria-label="delete">
                  <CloseIcon />
                </IconButton >
                <p className="font-bold text-lg">Edit Profile</p>
              </div>
              <Button
                type="submit"
                sx={{
                  padding: "10px",
                  paddingX: "20px",
                  borderRadius: "25px",
                  bgcolor: "#2e2e2d",
                  color: "white",
                }}
              >
                save
              </Button>
            </div>
            <div className=" no-scrollbar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <div>
                <React.Fragment>
                  <div className="w-full">
                    <div className="relative">
                      <img
                        src={bgimg}
                        alt=""
                        className="w-full h-[12rem] object-cover object-center"
                      />

                      <input
                        type="file"
                        name="backgroundImage"
                        className="absolute top-0 h-full w-full cursor-pointer left-0 opacity-0"
                        onClick={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                    <div className="relative">
                      <Avatar
                        src={selectedImage || auth.user?.image || avatar}
                        sx={{
                          width: "9rem",
                          height: "9rem",
                          border: "4px solid white",
                        }}
                      />
                      <input
                        type="file"
                        name="image"
                        className="absolute top-0 w-[10rem] h-full cursor-pointer left-0 opacity-0"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </React.Fragment>
              </div>

              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="FullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />

                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className="my-3">
                  <p className="tetx-lg">Birth Date . Edit</p>
                  <p className="text-2xl">December 24, 2002</p>
                </div>
                <p className="py-3 text-lg">Edit Professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
