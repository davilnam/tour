import express from 'express'
import { createBooking, getAllBooking, getSingleBooking } from '../controller/bookingController' 
import { verifyUser, verifyAdmin } from '../utils/verifyToken'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getSingleBooking)
router.get('/', verifyAdmin, getAllBooking)

export default router