const express = require('express');
const router = express.Router();
const packg = require('../package.json');
const version = packg.version;

const authRoutes = require('./auth/auth');
const manageRolewiseRoutes = require('./manageRolewiseData');

module.exports = () => {
   router.get('/', (req, res) => {
      res.json(`API Running for hobbyapp version ${version}`);
   });

   router.use('/auth', authRoutes());
   router.use('/', manageRolewiseRoutes())

   
   return router;
}
