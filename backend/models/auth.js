import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String, // You can adjust the data type as needed
    },
    resetTokenExpires: {
        type: Date,
    },

    isPremium: {
        type: Boolean, // Corrected the 'tyepe' to 'type' and specified the data type as Boolean
        default: false
      }
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
