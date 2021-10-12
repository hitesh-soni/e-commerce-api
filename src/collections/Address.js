import mongoose from 'mongoose';

// Create
const AddressSchema = new mongoose.Schema(
    {
        address: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pin_code: { type: String, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Address', AddressSchema, 'Address');
