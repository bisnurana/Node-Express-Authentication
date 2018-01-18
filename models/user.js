const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String, required: true, unique: true, lowercase: true,
  },
  password: { type: String, required: true },

});
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) { next(error); }
});
userSchema.methods.isPasswordValid = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mongoose.model('user', userSchema);

