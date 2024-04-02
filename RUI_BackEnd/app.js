const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes.js");
const userRoutes = require("./routes/user.routes.js");
const favoritesRoutes = require("./routes/favorites.routes.js");
const contactRoutes = require("./routes/contact.routes.js")
const magicLinkRoutes = require("./routes/magicLink.routes.js")
const tokenManipulationRouter = require("./routes/tokenManipulation.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tokenManipulation",tokenManipulationRouter)
app.use("/api/v1/favorites", favoritesRoutes);
app.use("/api/v1/contactUs", contactRoutes);
app.use("/api/v1/magicLink", magicLinkRoutes);



module.exports = { app };
