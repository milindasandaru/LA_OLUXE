import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {

    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesURL,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        console.log(productData);
        /*console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesURL);*/

        res.json({ success: true, message: "Product Added!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// function for list product
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for removing product
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// function for single product
const singleProduct = async (req, res) => {

    try {
        
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

export { addProduct, listProducts, removeProduct, singleProduct };


/*
// Function to add a product
const addProduct = async (req, res) => {
    try {
        // Destructure fields from request body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Access uploaded files (ensure multer is configured properly)
        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        // Debugging logs
        console.log('Product Details:', { name, description, price, category, subCategory, sizes, bestseller });
        console.log('Uploaded Files:', { image1, image2, image3, image4 });

        // Send success response
        res.json({
            success: true,
            message: 'Product added successfully',
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
*/