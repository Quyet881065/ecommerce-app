import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js'


const cartRouter = express.Router()

cartRouter.post('/get', userAuth,  getUserCart)
cartRouter.post('/update', userAuth,  updateCart)
cartRouter.post('/add', userAuth,  addToCart)

export default cartRouter