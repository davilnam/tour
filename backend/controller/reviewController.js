import Tour from '../models/Tour.js'
import Review from '../models/Review.js'

export const createReview = async (req, res) => {
    try{
        const {tourId} = req.params
        const {rating, reviewText, username} = req.body;
        if(!rating || !reviewText || !username){
            return res.status(409).json({
                success: false,
                message: 'Missing input'
            })
        }
        const newReview = await Review.create(req.body);
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: newReview._id}
        })
        return res.status(200).json({
            success: true,
            message: 'Review submited',
            data: newReview
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Failed to submit'            
        })
    }
}
