import Booking from '../models/Booking.js'

export const createBooking = async (req, res) => {
    try{        
        const newBooking = await Booking.create(req.body)
        return res.status(200).json({
            success: true,
            message: 'Your tour is booked',
            data: newBooking            
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'            
        })
    }
}

//get single booking
export const getSingleBooking = async (req, res) => {
    try{        
        const {id} = req.params
        const book = await Booking.findById(id)
        return res.status(200).json({
            success: true,
            message: 'successfull',
            data: book            
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Failed'            
        })
    }
}

//get all booking
export const getAllBooking = async (req, res) => {
    try{        
        const books = await Booking.find()
        return res.status(200).json({
            success: true,
            message: 'successfull',
            data: books            
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Failed'            
        })
    }
}