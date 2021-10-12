const mongoose = require('mongoose');

// Create
const TokenSchema = new mongoose.Schema(
    {
        access_token: String,
        refresh_token: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Token', TokenSchema, 'Token');
