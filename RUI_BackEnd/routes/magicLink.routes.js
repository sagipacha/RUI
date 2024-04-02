const { Router } = require("express");

  const { auth } = require("../middlewares/auth.js");
const { createMagicLink } = require("../controllers/magicLink.contollers.js");

  const router = Router()


  router.post("/createMagicLink",auth, createMagicLink);


module.exports = router;
