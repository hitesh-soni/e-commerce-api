const mongoose = require('mongoose');

// Create
const UserSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        mobile_number: String,
        password: String,
        dob: String,
        gender: String,
        profile_photo: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema, 'User');
