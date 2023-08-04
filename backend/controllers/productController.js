
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/api.features");


// create product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products
    })
})

// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// update products 

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})
// exports.updateProduct = async (req, res, next) => {
//     try {
//         let product = await Product.findById(req.params.id);

//         if (!product) {
//             return next(new ErrorHander("Product not found", 404));
//         }

//         product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false
//         });

//         res.status(200).json({
//             success: true,
//             product
//         });
//     } catch (err) {
//         // Handle any errors that occurred during the process
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while updating the product"
//         });
//     }
// };

// delete product 

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })


})