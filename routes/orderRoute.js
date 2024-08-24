import express from 'express'
import authMiddleWare from '../middlewares/auth.js'
import { listOrders, placeOrder, updateStatus, verifyOrder } from '../controllers/orderController.js'
import { usersOrder } from '../controllers/userController.js';


const  orderRouter=express.Router();

orderRouter.post('/place',authMiddleWare,placeOrder);

orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleWare,usersOrder)
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);

export default orderRouter;