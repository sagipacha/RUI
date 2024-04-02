const { Router } = require("express");
const {
  newProduct,
  deletProduct,
  updateProduct,
  getPruductById,
  getProducts,
  getHomeProduct,
  getStreetPruduct,
  getProductByFilters,  addStreetProduct,

  // addImageProduct,
} = require("../controllers/product.controllers.js");
const { auth } = require("../middlewares/auth");
// const upload = require("../middlewares/upload");

const router = Router();

router.get("/", getProducts);

router.post("/searchByFilters", getProductByFilters);
router.post("/create/addStreetProduct",auth,addStreetProduct);

router.get("/streetProduct", getStreetPruduct);

router.get("/homeProduct", getHomeProduct);
// router.post('/image/:id', upload.single("productImage"), addImageProduct)

router.get("/:id", getPruductById);

router.post("/", auth, newProduct);

router.delete("/:id", deletProduct);

router.patch("/:id", updateProduct);



module.exports = router;
