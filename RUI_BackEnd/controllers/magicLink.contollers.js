const { clientURL } = require("../utils/clientUrl");
const { generateMagicLink } = require("../utils/jwt");

const createMagicLink = async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    const token = generateMagicLink(user);
    const newLink = `${clientURL}/shareAddLink/${user.userId}/token/${token}`;
    res.send(newLink);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
};
module.exports = { createMagicLink };
