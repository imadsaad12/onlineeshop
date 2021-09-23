import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import calculateCartTotal from '../../utils/calculateCartTotal'
import Order from '../../models/Order'

const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
export default async (req,res)=>{
    const {paymentData}=req.body
    try{
        //1)verify and get user id from token
            const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)

        //2)find cart based on user id and populate it
        const cart = await Cart.findOne({user:userId}).populate({
            path:"products.product",
            model:"Product"
        })
        //3)calculate the cart totals again from cart products 
        const {cartTotal,stripeTotal}=calculateCartTotal(cart.products)
        //4)get the email for payment data see if email is linked with existing stripe customer 
            const prevcustomer=await stripe.customers.list({
                email:paymentData.email,
                limit:1
            })
            const isExistingCustomer=prevcustomer.data.length > 0;
        //5)if not ,create them based on ther emails
        let newCustomer;
        if(!isExistingCustomer){
            newCustomer=await stripe.customers.create({
                email:paymentData.email,
                source:paymentData.id
            })
        }
        const customer=(isExistingCustomer && prevcustomer.data[0].id) || newCustomer.id

        //6)create charge with the total and send receipt email
                const charge=await stripe.charges.create({
                    currency:"USD",
                    amount:stripeTotal,
                    receipt_email:paymentData.email,
                    customer,
                    description:`Checkout | ${paymentData.email} | ${paymentData.id}`,

                },{idempotency_key:uuidv4()})
        //7)Add order data to database
            await new Order({
                user:userId,
                email:paymentData.email,
                total:cartTotal,
                products:cart.products
            }).save()
        //8))clear products in cart
        await Cart.findOneAndUpdate(
            {_id:cart._id},
            {$set:{products:[]}}
        )
        //9))send back success res
        res.status(200).send('checkout success')
    }catch(err){

    }
}
