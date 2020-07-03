require('dotenv').config({
   path: `./env/${process.env.NODE_ENV || 'development'}.env`,
});

let jwt = require('jsonwebtoken');
let my_token_secret = process.env.TOKEN
let login_model = require('../../models/login_model');

//create token
exports.creatAdminAppToken = (data, callback) => {
   login_model.admin_login(data, (err, userObj) => {
      if (err) {
         callback(true, err);
      }
      else {
         if (userObj !== null) {
            let token = jwt.sign({ email: userObj.email, userName: userObj.userName, _id: userObj._id }, my_token_secret);
            let paramObj = {};
            paramObj.token = token;
            paramObj.data = userObj;
            paramObj.data.token = token;
            callback(false, paramObj);
         }
         else
            callback(true, {});
      }
   });
};

exports.creatUserAppToken = (data, callback) => {
   login_model.client_login(data, (err, userObj) => {
      if (err) {
         callback(true, err);
      }
      else {
         if (userObj !== null) {
            let token = jwt.sign({ email: userObj.email, userName: userObj.userName, _id: userObj._id }, my_token_secret);
            let paramObj = {};
            paramObj.token = token;
            paramObj.data = userObj;
            paramObj.data.token = token;
            callback(false, paramObj);
         }
         else
            callback(true, {});
      }
   });
};
//verify token
exports.verifyAppToken = (token, callback) => {
   jwt.verify(token, my_token_secret, function (err, decoded) {
      if (err) {
         callback(true)
      }
      else {
         if (decoded) {
            callback(false, decoded)
         }
      }
   });
}
