import mongoose from 'mongoose';

// Create
const ProductsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        tag_id: { type: String },
        description: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String },
        images: [{ type: String }],
        cover_image: { type: String, default: 'public/products/cover_image.jpg' },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    },
    {
        timestamps: true,
    },
);

/**
 * Modify data befor saving
 */
ProductsSchema.pre('save', function sch(next) {
    const doc = this;

    const slug = doc.name.toLowerCase().split(/\s+/).join('-');
    products.find({ slug }, (err, res) => {
        if (res.length) doc.slug = `${slug}-${Date.now()}`;
        else doc.slug = slug;
        next();
    });
});

/**
 * Add base url in image
 */
ProductsSchema.virtual('image_url').get(function () {
    return this?.images?.map((element) => {
        return process.env.BASE_URL + element;
    });
});

/**
 * Add base url in image
 */
ProductsSchema.virtual('cover_image_url').get(function () {
    return process.env.BASE_URL + this?.cover_image;
});

const products = mongoose.model('Products', ProductsSchema, 'Products');

export default products;
