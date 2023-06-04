import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  try {    
    const savedTour = await Tour.create(req.body);    
    return res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const updateTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    await Tour.findByIdAndDelete(id);
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

export const getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id).populate('reviews');
    return res.status(200).json({
      success: true,
      message: "Successfully",
      data: tour,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// get all tour
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find().populate('reviews')
      .skip(page * 8)
      .limit(8);
    return res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully",
      data: tours,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get Tour by Search
export const getTourBySearch = async (req, res) => {
  // here 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');

    return res.status(200).json({
      success: true,
      message: "Successfull",
      data: tours
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get featured tour

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({featured: true}).populate('reviews').limit(8)
    return res.status(200).json({
      success: true,
      message: 'Successfull',
      data: tours
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
}

// get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount()
    return res.status(200).json({
      success: true,
      data: tourCount
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
}