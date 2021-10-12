import mongoose from 'mongoose';

// Create
const CategoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String },
        description: { type: String },
        cover_image: { type: String },
    },
    {
        timestamps: true,
    },
);

/**
 * Modify data befor saving
 */
CategoriesSchema.pre('save', function sch(next) {
    const doc = this;
    const slug = doc.name.toLowerCase().split(/\s+/).join('-');
    categories.find({ slug }, (err, res) => {
        if (res.length) doc.slug = `${slug}-${Date.now()}`;
        else doc.slug = slug;
        next();
    });
});

/**
 * Add base url in image
 */
 CategoriesSchema.virtual('cover_image_url').get(function () {
    return process.env.BASE_URL + this?.cover_image;
});

const categories = mongoose.model('Categories', CategoriesSchema, 'Categories');

export default categories;
