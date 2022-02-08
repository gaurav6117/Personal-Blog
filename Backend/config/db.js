const mongoose = require("mongoose")
// const db = "mongodb://localhost:27017/Neostore";
const db = "mongodb+srv://mernpizza:mernpizza1@cluster0.drotx.mongodb.net/blog?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("mongoose connected");
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports = connectDB