const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const token_auth_service = require('./token_auth')

const client_schema = require('../../schema/client_schema');

//admin dash
module.exports = () => {
   router.post('/admin_login', (req, res) => {
      const { admin } = req.body;
      token_auth_service.creatAdminAppToken(admin, (err, token) => {
         if (err)
            res.status(401).json({ success: false, message: "unauthorize User !" });
         else {
            res.status(200).json({ success: true, message: "login successfully.", data: token.data, success: true });
         }
      });
   });

   //website login
   router.post('/client_login', (req, res) => {
      const { user } = req.body;
      token_auth_service.creatUserAppToken(user, (err, token) => {
         if (err)
            res.status(401).json({ success: false, message: "unauthorize User !" });
         else {
            res.status(200).json({ success: true, message: "Login successfully", data: token.data, success: true });
         }
      });
   });

   //verify token url
   router.get('/verify_token', (req, res) => {
      let token = req.query.token;
      token_auth_service.verifyAppToken(token, (err, decode) => {
         if (err) {
            logger.error(decode);
            res.status(401).json({ message: "unauthorize User !" });

         }
         else {
            res.status(200).json({ message: "token verified.", name: decode.email });
         }
      })
   });

   router.post('/client_add', (req, res) => {
      let client = mongoose.model('client', client_schema);
      client.aggregate([
         { $match: { "email": req.body.email } },

      ]).exec((err, succMatch) => {
         if (err) {
            res.status(400).json({ success: false, message: err })
         }
         else if (succMatch.length !== 0) {
            res.status(200).json({ success: false, message: "You are already registered" })
         }
         else {
            clientSchemaData = new client({
               name: req.body.name,
               email: req.body.email,
               phoneNumber: req.body.phoneNumber,
               password: req.body.password,
               gender: req.body.gender,
               userType: req.body.userType,
               institutionName: req.body.institutionName,
               role: req.body.role
            })
            clientSchemaData.save((err, succ) => {
               if (err) {
                  res.status(400).json({ success: false, message: err })
               }
               else {
                  res.status(200).json({ success: true, message: "Registered successfully", data: succ })
               }
            })
         }
      })
   })
   return router;
}
