const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
const admin_schema = new Schema
   ({
      name: { type: String, default: null },
      // address: {type:String,default:null},
      // state: {type:String,default:null},
      // city: {type:String,default:null},
      // street: {type:String,default:null},
      // houseNumber: {type:String,default:null},
      // zip: {type:Number,default:null},
      email: { type: String, default: null },
      // image: {type:String,default:null},
      // userName: {type:String,default:null},
      phoneNumber: { type: String, default: null },
      password: { type: String, default: null },
      // dob: {type:String,default:null},
      // bloodGroup: {type:String,default:null},
      // gender: {type:String,default:null},
      // aadharNumber: {type:String,default:null},
      // facebookId:{type:String,default:null},
      // twitterId:{type:String,default:null},
      // linkedinId:{type:String,default:null},
      // dribbleId:{type:String,default:null},
      // instagramId : {type:String,default:null},
      // biography:{type:String,default:null},
      token: { type: String, default: null },
      addedBy: { type: String, default: null },
      // frId: {type:String,default:null},
      //roleId: {type:Number,default:null},
      //subRoleId: {type:String,default:null},
      role: { type: String, default: null },
      isActive: { type: Boolean, default: true },
      isBlocked: { type: String, default: "0" },
      isDeleted: { type: Boolean, default: false },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      lastLoggedIn: String,
      remember_token: String,
   }
   );

module.exports = admin_schema;