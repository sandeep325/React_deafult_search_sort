const date = require('date-and-time');
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../Model/User.Model");
exports.CreateUser = async (req, res, next) => {
   try {
      if (!req.body) {
         return res.status(409).json({
            status: 409,
            message: 'Please provide the valid data.'
         });
      }
      else {
         // console.log(req.body);
         const { name, email} = req.body;
         const {filename} = req.file;
         // check user is already exist or not 
         const CheckEmail = await User.find({ email: email });
         if (CheckEmail.length > 0) {
            return res.status(409).json({
               status: 409,
               message: "Email already exist try another.",
               email: email
            });
         }
         //create user
         const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
            image: filename
         });
         const InsertRes = await user.save();
         // console.log(InsertRes);
         if (InsertRes) {
            res.status(201).json({
               status: 201,
               message: "User register successfully.",
               id: InsertRes._id,
            });
         }
         else {
            return res.status(404).json({
               status: 404,
               message: "User could not register.",
               id: InsertRes._id,
            });
         }
      }
   }
   catch (err) {
      return res.status(500).json({
         status: 500,
         message: 'Internal server Error.',
         Error: err
      });
   }
}


exports.UserList = async (req, res, next) => {
   try {
      let UserRes = await User.find().sort({ _id: -1 });
      if (UserRes?.length > 0) {
          return res.status(200).json({
              status: 200,
              count: UserRes?.length,
              data: UserRes.map((data) => {
               var img = `http://localhost:${process.env.PORT}/${process.env.PATH_IMG}/${data?.image}`;
                  return {
                      id: data?._id,
                      name: data?.name,
                      email: data?.email,
                      image: img,
                  }
              }),
              message: 'User list.'
          });

      } else {
          return res.status(200).json({
              status: 200,
              count: 0,
              data: [],
              message: 'User list.'
          });
      }
  }
  catch (error) {
      return res.status(500).json({ status: 500, Error: error, message: 'Internal server Error !.' });

  }
}

