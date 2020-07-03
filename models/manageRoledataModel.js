const mongoose = require('mongoose')

let admin_schema = require('../schema/admin_schema');
const admin = mongoose.model('admin_users', admin_schema);
var _ = require('lodash');

//------------------------------------- rolewise data -----------------------------------
exports.roleDataSubmit = (roleData, callback) => {
   try {
      if (!_.isEmpty(roleData)) {
         let adminModel = new admin(roleData);
         adminModel.save((err, roleDataResult) => {
            if (err)
               callback(true, err);
            else {
               callback(false, roleDataResult);
            }
         });
      }
   }
   catch (err) {
      console.error(err);
      return;
   }
}

exports.getRoleData = (role, callback) => {
   try {
      admin.find({ isDeleted: false, role: role }, (err, roleData) => {
         if (err)
            callback(true, err);
         else {
            callback(false, roleData);
         }  // }
      });
   }
   catch (err) {
      console.error(err);
      return;
   }
}

exports.roleDataUpdate = (roleData, callback) => {
   try {
      if (!_.isEmpty(roleData)) {
         // crud.findOne({ _id: crudData.id, isDeleted: false }, (err, doc) => {
         //     if (err)
         //         callback(true, err);
         //     else {
         //         //let crudSchema = new crud(crudData);
         //         doc.save((err, crudDataResult) => {
         //             if (err)
         //                 callback(true, err);
         //             else {
         //                 callback(false, crudDataResult);
         //             }
         //         });
         //     }
         // });
         let toUpdate = {
            name: roleData.name,
            email: roleData.email,
            phoneNumber: roleData.phoneNumber
         }

         admin.updateOne(
            {
               _id: roleData.id
            },
            {
               $set: toUpdate,
            },
            {
               $upsert: true,
               $multi: true
            },
            (err, updateResult) => {
               if (err) {
                  callback(err, null);
               } else {
                  let response = {
                     role: toUpdate,
                     isNew: false,
                  };
                  callback(null, response);
               }
            }
         );
      }
      else {
         callback(true, {});
      }
   }
   catch (err) {
      console.error(err);
      return;
   }
}

exports.roleDataDelete = (id, callback) => {
   try {
      if (!_.isEmpty(id)) {
         admin.deleteOne({ _id: id }, (err, roleDataResult) => {
            if (err)
               callback(true, err);
            else {
               callback(false, roleDataResult);
            }
         });
      }
   }
   catch (err) {
      console.error(err);
      return;
   }
}