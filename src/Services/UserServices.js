class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }
  async createUser(user) {
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }
  async loginUser(email) {
    return await this.UserModel.findOne({ email: email });
  }
}

module.exports = UserService;
