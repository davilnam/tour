import User from "../models/User.js";


export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json({
      success: true,
      message: "Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// get all User
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      message: "Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};
