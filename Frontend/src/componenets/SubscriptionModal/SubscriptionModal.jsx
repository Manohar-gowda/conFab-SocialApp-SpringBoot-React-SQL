import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import img from "../Images/verifiedIcon.png";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function SubscriptionModal({open, handleClose}) {
  

  const [plan, setPlan] = useState("Anually");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-400">
                <h1 className="text-xl pr-5">
                  Gold subscribers with a verified phone number will get a gold
                  checkmark once approved.
                </h1>
                <img src={img} alt="" className="w-[24] h-[24]" />
              </div>

              <div className="flex justify-between border rounded-full bg-stone-700 px-5 py-3">
                <div>
                  <span
                    onClick={() => setPlan("Anually")}
                    className={`${
                      plan === "Anually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                  >
                    Anually
                  </span>
                  <span className="text-green-500 text-sm ml-5">SAVE 12%</span>
                </div>
                <p
                  onClick={() => setPlan("Monthly")}
                  className={`${
                    plan === "Monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                >
                  Monthly
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className="text-sm text-black">
                    <b>Exclusive Content:</b> Unlock special features and content
                    available only to subscribers.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className="text-sm text-black">
                    <b>Ad-Free Experience:</b> Enjoy a seamless, ad-free browsing
                    experience.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className="text-sm text-black"><b>Early Access:</b> Be the first to try new updates and features
                  before anyone else.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className="text-sm text-black">
                    <b>Priority Support:</b> Get top-notch customer service with fast
                    response times.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className="text-sm text-black">
                    <b>Enhanced Privacy:</b> Benefit from advanced privacy settings and
                    security options.
                  </p>
                </div>
              </div>

              <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                <span className="line-through italic">₹4,500.00</span>
                <span className="px-5 ">₹3,400.00</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
