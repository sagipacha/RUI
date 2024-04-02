const { Product } = require("../models/product.models");
// const { uploadToCloudinary } = require("../upload-media-cloud/cloudinary");

const getHomeProduct = async (req, res) => {
  const homeProducts = await Product.find({ isStreetProduct: false });
  res.send(homeProducts);
};

const getStreetPruduct = async (req, res) => {
  const streetProduct = await Product.find({ isStreetProduct: true });
  res.send(streetProduct);
};

const getProductByFilters = async (req, res) => {
  const products = await Product.find({
    category: req.body.category,
    condition: req.body.condition,
    subCategory: req.body.subCategory ,
  });
  res.send(products);
};

const getProducts = async (req, res) => {
  const product = await Product.find({}).populate("userId");
  console.log(product);
  res.send(product);
};

const getPruductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("userId");
    res.send(product);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const newProduct = async (req, res) => {
  const body = req.body;
  try {
    console.log(req.user);
    body.userId = req.user.id;
    const product = new Product(body);
    product.productId = product._id;
    await product.save();
    res.send("added");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const addStreetProduct = async (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    console.log(body.productData);
    const product = new Product(body.productData);
    product.uploadType = "street";
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
// const addImageProduct = async (req, res) => {
//   try {
//     const data = await uploadToCloudinary(req.file.path, "Product-images");

//     await Prodact.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           imageUrl: data.url,
//           publicId: data.public_id,
//         },
//       },
//     );
//     res.status(200).send("image uploaded!");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Cannot upload image !");
//   }
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await Product.findByIdAndUpdate(id, body, { new: true });
    return res.send(update);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const deletProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const isDeleted = await Product.findByIdAndDelete(id);
    console.log(isDeleted);
    return res.send(isDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

module.exports = {
  newProduct,
  deletProduct,
  updateProduct,
  getPruductById,
  getProducts,
  getHomeProduct,
  getStreetPruduct,
  getProductByFilters,
  addStreetProduct,
  //   addImcageProduct,
};
