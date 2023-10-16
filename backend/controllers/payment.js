import Razorpay from "razorpay";
import User from '../models/auth.js';

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_LGXCa6YWZ0NGjj",
    key_secret: "oRXrtmRPzBPR0FWMozhkqAfP"
}); 

export const createPayment = async (req, res) => {

    const {userId}=req.params;
    try {
        const amount = req.body.amount * 100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, async (err, order) => {
            if (!err) {
                // Here, you should add logic to update the 'isPremium' field for the user.
                // Assuming you have the user ID, you can update the 'isPremium' field like this:

         
                try {
                    const updatedUser = await User.findByIdAndUpdate({_id:userId}, { isPremium: true }, { new: true });
                    console.log(updatedUser)

                    if (updatedUser) {
                        res.status(200).send({
                            success: true,
                            msg: 'Order Created',
                            order_id: order.id,
                            amount: amount,
                            key_id: "rzp_test_LGXCa6YWZ0NGjj",
                            product_name: req.body.name,
                            description: req.body.desc,
                            contact: "9720428758",
                            name: "Arish",
                            email: "mdarish159@gmail.com",
                            isPremium:updatedUser.isPremium
                        });
                    } else {
                        res.status(400).send({ success: false, msg: 'User not found' });
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            } else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
