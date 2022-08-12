const mongoose = require("mongoose");

// CONNECTION TO THE DATA BASE

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected");
  } catch (error) {
    console.error("Error mgs", error);
    throw new Error(error);
  }
};

module.exports = { dbConnection };
