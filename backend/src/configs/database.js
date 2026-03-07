const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch(err) {
        console.log("database error:", err.message);
    }
}

module.exports = connectToDB;