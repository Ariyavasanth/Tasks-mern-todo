const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  getProfile,
  updateProfileDetails,
  updateProfileImage,
  deleteProfileImage,
} = require("../controller/profileController");
const router = express.Router();

//Get user profile
router.get("/", protect, getProfile);
router.put("/details", protect, updateProfileDetails);
router.put("/image", upload.single("image"), protect, updateProfileImage);
router.delete("/image", protect, deleteProfileImage);

module.exports = router;
