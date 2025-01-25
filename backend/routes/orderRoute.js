import express from 'express'
import { placeOrder, placeOrderStripe, placeOrdersRazorpay, updateStatus, allOrders, userOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'
const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth , allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', userAuth, placeOrder)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.post('/razorpay', userAuth, placeOrdersRazorpay)

// User Features
orderRouter.post('/userorders', userAuth,userOrder)

export default orderRouter