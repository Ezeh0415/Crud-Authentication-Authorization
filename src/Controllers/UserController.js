const bcrypt = require("bcryptjs");
const generateToken = require("../../middlewares/JWT-Token");
class UserController {
  constructor(userService) {
    this.userService = userService;

    // bind this

    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all the fields" });
    }

    try {
      const pwdHash = bcrypt.hashSync(password, 10);
      const user = await this.userService.createUser({
        name: name,
        email: email,
        password: pwdHash,
      });

      const token = await generateToken(user);
      return res.status(200).json({ data: user, token: token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all the fields" });
    }
    try {
      const user = await this.userService.loginUser(email);
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = await generateToken(user);

      return res.status(200).json({ data: user, token: token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
