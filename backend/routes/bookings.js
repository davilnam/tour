import express from 'express'
import { createBooking, getAllBooking, getSingleBooking } from '../controller/bookingController.js' 
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getSingleBooking)
router.get('/', verifyAdmin, getAllBooking)

export default router