const cloudinary = require("../utils/cloudinary");
const _ = require("lodash");
const mongoose = require("mongoose");
const { unlink } = require("fs").promises;
const path = require("path");
const { validateUser, User } = require("../models/user");
const bcrypt = require("bcryptjs");

// Function to create a user
const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ ok: false, message: "User already registered." });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res.status(200).json({
    ok: true,
    message: `${user.name} created successful.`,
    user: _.pick(user, ["name", "email", "_id"]),
  });
};
// Function to get all users
const getUsers = async (req, res) => {
  const users = await User.find().select("name email profile").sort("-_id");
  if (!users)
    return res.status(400).json({ ok: false, message: "User does not exits" });
  if (users.length === 0)
    return res.status(200).json({ ok: true, message: "No user found yet." });

  res.status(200).json({ ok: true, users });
};
// Function a user based on params
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("name profile _id");
  if (!user)
    return res
      .status(400)
      .json({ ok: false, message: "A user with the given ID was not found" });

  // Extract creation time from ObjectId
  const creationTime = user._id.getTimestamp();

  // Add creation time to the user object
  const userWithTime = {
    ...user.toObject(),
    creationTime,
  };

  res.status(200).json({ ok: true, userWithTime });
};
// Function to delete a user
const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ ok: false, message: "Invalid user id" });

  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user)
    return res
      .status(404)
      .json({ ok: false, message: "A user with the given ID was not found" });

  res.status(200).json({ ok: true, message: `${user.name} Deleted!` });
};
// Function to update a user profile information
const updateUser = async (req, res) => {
  let user = await User.findOne({ _id: req.auth._id });
  if (!user)
    return res.status(404).json({ ok: false, message: "User no found" });

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }
  const updateFields = { ...req.body, password: user.password };
  user = await User.findOneAndUpdate({ _id: req.auth._id }, updateFields, {
    new: true,
    runValidators: true,
  }).select("-admin -region -password -__v");

  res.status(200).json({ ok: true, message: user });
};
// Function to update a user profile image
const updateProfile = async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ ok: false, message: "Profile Image required." });

  let user = await User.findOne({ _id: req.auth._id }).select("profile");
  if (!user)
    return res.status(400).json({ ok: false, message: "No user found" });

  try {
    // Check if user.profile has a value (i.e if the user already has a profile image)
    if (user.profile) {
      // Extract the public ID from the existing profile image URL
      const publicId = user.profile.split("/").pop().split(".")[0];

      // Delete the profile image from cloudinary
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ ok: false, message: "Error deleting profile image" });
        }
        console.log("Image deleted");
      });
    }
    // Upload new profile image in Cloudinary
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error)
        return res.status(500).json({ success: false, message: "Error" });

      user.profile = result.url;
      await user.save();
      res.status(200).json({ ok: true, message: "Profile Updated." });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, message: error });
  }
};
// Function to remove a user profile
const removeProfile = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.auth._id }).select("profile");
    if (!user)
      return res.status(400).json({ ok: false, message: "User not found" });

    try {
      // Check if user.profile has a value
      if (user.profile) {
        // Extract public ID from the existing profile image url
        const publicId = user.profile.split("/").pop().split(".")[0];

        // Delete the profile image from Cloudinary
        cloudinary.uploader.destroy(publicId, async (error, result) => {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ ok: false, message: "Error deleting profile image" });
          }
          user.profile = null;
          await user.save();
          res.status(200).json({ ok: true, message: "Profile removed." });
        });
      }
    } catch (error) {
      res.status(400).json({ ok: false, message: error });
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Function to get my profile
const me = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).select("-__v -password");
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updateProfile,
  removeProfile,
  me,
};
