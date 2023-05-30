import tourRoute from './tours.js'
import userRoute from './users.js'
import authRoute from './auth.js'
import reviewRoute from './reviews.js'
import bookingRoute from './bookings.js'

export const initWebRoute = (app) => {
    app.use('/tours', tourRoute)
    app.use('/users', userRoute)
    app.use('/auth', authRoute)
    app.use('/review', reviewRoute)
    app.use('/booking', bookingRoute)
}

