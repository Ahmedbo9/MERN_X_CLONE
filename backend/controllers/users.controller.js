import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const curruntUser = await User.findById(req.user._id);

    if (!userToModify || !curruntUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    //check if the current user is already following the user
    const isFollowing = curruntUser.following.includes(id);
    if (isFollowing) {
      //unfollow the user
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });

      res.status(200).json({
        message: "User unfollowed successfully",
        curruntUserId: req.user._id,
        id: id,
      });
    } else {
      //follow the user
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });

      //send notification to the users

      const notification = new Notification({
        form: req.user._id,
        to: id,
        type: "follow",
        read: false,
      });

      await notification.save();
      res.status(200).json({
        message: "User followed successfully",
        notification: notification,
      });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser: ", error.message);
    res.status(500).json({ message: error.message });
    //send notigication to the users
    res.status(200).json({ message: "User followed successfully" });
  }
};
