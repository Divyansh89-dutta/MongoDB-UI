var mongoose = require('mongoose');
async function connectToDatabase(){
  await mongoose.connect('mongodb://127.0.0.1:27017/mongodb');
  console.log('Connected to MongoDB');
}
connectToDatabase();
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
}); 
const User = mongoose.model('User', userSchema);  

module.exports = User;