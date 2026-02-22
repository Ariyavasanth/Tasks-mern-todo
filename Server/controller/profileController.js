const User = require("../model/User");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary for image uploads

//get Profile
exports.getProfile = (req, res) => {
  try {
    res.json({ profile: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update the username
exports.updateProfileDetails = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    ).select("-password");
    res.json({ message: "Details updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update the get profileImage
exports.updateProfileImage = async (req, res) => {
  try {
    console.log("==== UPDATE PROFILE IMAGE HIT ====");
    console.log("Cookies:", req.cookies);
    console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ⭐ Step 1: Delete old Cloudinary image if exists
    if (user.profileImage) {
      const publicId = user.profileImage.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`user/profile/${publicId}`);
      } catch (error) {
        console.log("Cloudinary delete failed:", error.message);
      }
    }

    // 3️⃣ Upload new image
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "user/profile",
      resource_type: "image",
      transformation: [{ width: 300, height: 300, crop: "fill" }],
    });

    // 4️⃣ Update user record
    user.profileImage = uploaded.secure_url;
    await user.save();
    console.log("Cookies:", req.cookies);
    console.log("File:", req.file);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({
      message: "Profile image updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete the progileimage
exports.deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: null },
      { new: true }
    ).select("-password");

    res.json({ message: "Image removed", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
