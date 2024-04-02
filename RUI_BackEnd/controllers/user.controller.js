const { User } = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { generateToken, generateResetPasswordToken } = require("../utils/jwt");
const {
  sendWelcomeEmail,
  sendResetPasswordEmail,
} = require("../services/email/sendEmail");
const jwt_decode = require("jwt-decode");

const clientURL = "http://localhost:5173/";
//^ getAllUsers
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

//^ register
const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const isEmailUsed = await User.findOne({ email });
  if (isEmailUsed) {
    return res.status(400).send("email already in use");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hash,
      firstName,
      lastName,
      role: "free",
    });

    await user.save();
    const token = generateToken({
      email: user.email,
      id: user._id,
      role: "free",
    });

    await sendWelcomeEmail(user.email, "welcome", { name: user.firstName });

    return res.send({
      user: { email, id: user._id, role: "free", firstName, lastName },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({
          email: user.email,
          id: user._id,
          role: "free",
          firstName: user.firstName,
          lastName: user.lastName,
        });
        return res.send(token);
      }
      return res.status(401).send("Email or password are incorrect");
    }

    return res.status(401).send("Email or password are incorrect");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//^ user Forgot Password
const userForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).send("user not found");
    const resetToken = generateResetPasswordToken({ user });
    const link = `${clientURL}/passwordReset/token/${resetToken}/id/${user._id}`;
    await sendResetPasswordEmail(user.email, "Password Reset Request", {
      name: user.fullName,
      link: link,
    });
    res.send("email sent");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};
//^ user reset password
const userResetPassword = async (req, res) => {
  const { body } = req;
  const reqUser = req.user;
  try {
    console.log(reqUser.user._id);
    console.log("tt");
    const user = await User.findById(reqUser.user._id);
    const hash = await bcrypt.hash(body.newPassword, 10);
    user.password = hash;
    await user.save();
    res.send("Password reset successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error resetting password");
  }
};
// const updateUserDetails = async (req, res) => {
//   const { body, params } = req;
//   const { id } = params;
//   try {
//     const product = Product.findByIdAndUpdate(id, body, { new: true });
//     if (product) return res.send(product);
//     return res.send("product wasn't found");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Error");
//   }
// };
//^delete
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};

const loginGoogle = async (req, res) => {
  const { token } = req.body;

  const credentialResponseDecoded = jwt_decode.jwtDecode(token);

  try {
    const user = await User.findOne({ email: credentialResponseDecoded.email });
    if (user) {
      return res.send(user);
    }
    return res.status(401).send("Email or password are incorrect");
  } catch (err) {
    return res.status(500).send("Invalid Email");
  }
};

// router.post('/auth/google', (req, res) => {
//   const { token } = req.body;

//   const decodedToken = jwt.decode(token);

//   const user = { id: decodedToken.sub, email: decodedToken.email };
//   const accessToken = jwt.sign(user, 'your_secret_key');
//   res.json({ accessToken });
// });

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser,
  userForgotPassword,
  userResetPassword,
  loginGoogle,
};
