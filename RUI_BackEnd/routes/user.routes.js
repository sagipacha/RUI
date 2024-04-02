const { Router } = require("express");
const {
  getAllUsers,
  register,
  login,
  userForgotPassword,
  deleteUser,
  userResetPassword,
  loginGoogle
} = require("../controllers/user.controller");
const { auth, authorize } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllUsers);

//^ register
router.post("/register", register);

//^ login
router.post("/login", login);

//^ forgot password
router.post("/forgotPassword", userForgotPassword);
//^ reset password
router.post("/resetPassword", auth, userResetPassword);

//^ update
// router.patch("/updateUserDetails/:id", updateUserDetails);

//^delete user
router.delete("/:id", auth, authorize(["admin"]), deleteUser);

//^login with user
router.post("/auth/google", loginGoogle);



module.exports = router;
