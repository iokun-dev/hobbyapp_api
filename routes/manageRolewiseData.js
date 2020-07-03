const express = require('express');
const router = express.Router();
const manageRoledataModel = require('../models/manageRoledataModel')

module.exports = () => {
   //-------------- Rolewise data Submit -------
   router.post('/submit-rolewisedata', (req, res) => {
      const { roleData } = req.body;
      manageRoledataModel.roleDataSubmit(roleData, (err, roleResult) => {
         if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Error, In saving data !" });
         }
         else {
            res.status(200).json({ success: true, message: "Data saved successfully", data: roleResult });
         }
      })
   });

   //-----------Rolewise data Get -------
   router.post('/get-rolewisedata', (req, res) => {
      const { role } = req.body;
      manageRoledataModel.getRoleData(role, (err, roleDataResult) => {
         if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Error" });
         }
         else {
            res.status(200).json({ success: true, message: "Data get successfully", data: roleDataResult });
         }
      });
   });

   //-------------- Rolewise data Update -------
   router.post('/update-rolewisedata', (req, res) => {
      let { roleData } = req.body;
      manageRoledataModel.roleDataUpdate(roleData, (err, roleResult) => {
         if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Error, In updating data !" });
         }
         else {
            res.status(200).json({ success: true, message: "Data updated successfully", data: roleResult });
         }
      })
   });

   //-------------- Rolewise data Delete -------
   router.post('/delete-rolewisedata', (req, res) => {
      let { id } = req.body;
      manageRoledataModel.roleDataDelete(id, (err, roleResult) => {
         if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Error, In deleting data !" });
         }
         else {
            res.status(200).json({ success: true, message: "Data deleted successfully", data: roleResult });
         }
      })
   });

   return router;
}
