const mongoose = require('mongoose');

let admin_schema = require('../schema/admin_schema');
let client_schema = require('../schema/client_schema');
let role = require('../schema/role_schema');
let _ = require('lodash');

//------------admin login---------------
exports.admin_login = async (userLogin, callback) => {
   const admin = mongoose.model('admin_users', admin_schema);
    try {
        //let loginAdmin = await admin.findOne({ email: userLogin.email.toLowerCase(), password: userLogin.password,roleId:{$nin: [3, 4]} ,isDeleted:false, isActive:true }).exec();
        let loginAdmin = await admin.findOne({ email: userLogin.email.toLowerCase(), password: userLogin.password,isDeleted:false, isActive:true }).exec();
        if (!_.isEmpty(loginAdmin)) {
            callback(false, loginAdmin);
        }
        else {
            callback(true, {});
        }
    }
    catch (err) {
        console.error(err);
        return;
    }
};


//Change password
exports.changePassword = async (userinfo, callback) => {
    var  email= userinfo.email;
    var  newpassword= userinfo.password;
    try {

        let loginUser = await user.findOne({ email: email.toLowerCase(), isActive:true }).exec();
        if (_.isEmpty(loginUser)) {
            callback(true, loginUser);
        }
        else {
            user.findByIdAndUpdate({ '_id': loginUser.id}, { $set:{'password': newpassword }},{new:true}, (err, userInfoResult) => {
                if (err)
                    callback(true, err);
                else {
                    callback(false, {});
                }
            });
        }
    }
    catch (err) {
        console.error(err);
        return;
    }
};



//------------website login---------------
exports.client_login = async (clientLogin, callback) => {
   const client = mongoose.model('client', client_schema);
    try {
        let loginClient = await client.findOne({ email: clientLogin.email.toLowerCase(), password: clientLogin.password,isDeleted:false, isActive:true, roleId: { $ne: 1 }  }).exec();
        if (!_.isEmpty(loginClient)) {
            callback(false, loginClient);
        }
        else {
            callback(true, {});
        }
    }
    catch (err) {
        console.error(err);
        return;
    }
};

//-------------------------------------user Registration-----------------------------------
exports.userRegistration = (userInfo, callback) => {
    try {
        if (!_.isEmpty(userInfo)) {
            user.findOne({ email:userInfo.email,isDeleted:false},(err,userEmail) => {
                if(err){
                    callback(true,err);
                }
                else if(userEmail){
                    callback(false,userEmail=1);
                }
                // else {
                //     if(userEmail){
                //         callback(false,userEmail=1)
                //     }
                    else{
                        let userSchema = new user(userInfo);
                        userSchema.save((err, userRegistrationResult) => {
                            if (err)
                                callback(true, err);
                            else {
                                // let academicDto = filterdAcademicSession(result);
                                callback(false, userRegistrationResult);
                            }
                        });
                    }

                    // }
                });
            } else {
                callback(true, {});
            }
        }
    catch (err) {
        console.error(err);
        return;
    }
}


// //-----------------update user profile-------------------
exports.updateUserRegistration = (userId, userInfoData, callback) => {
    try {
        if (!_.isEmpty(userId) && !_.isNull(userInfoData)) {
                        user.findByIdAndUpdate({ '_id': userId }, { $set: userInfoData },{new:true}, (err, userInfoResult) => {
                            if (err)
                                callback(true, err);
                            else {
                                 callback(false, userInfoResult);
                            }
                        });
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
//=================================== User List =================================

exports.getUserList = function (req, callback) {
    try {
        //user.find({  roleId:{$ne:1} , isDeleted:false}, (err, userList) => {
        user.find({isDeleted:false}, (err, userList) => {
            if (err) {
                callback(true, err);
            }
            else {
                callback(false, userList);
            }
        });

    }
    catch (err) {
        console.error(err);
        return;
    }
};

//==================================User Role List===================================
exports.userRoleList = function (req, callback) {
    try {
        role.find({isDeleted:false }, (err, userList) => {
            if (err) {
                callback(true, err);
            }
            else {
                callback(false, userList);
            }
        });

    }
    catch (err) {
        console.error(err);
        return;
    }
};

//------------------------------- delete user Information By Id----------------------------------
    exports.deleteUser = (userId, callback) => {
        try {
            user.findOneAndUpdate({'_id':userId}, {$set:{isDeleted:true}},{new:true} ,(err, rowResult) => {
                    if (err)
                        callback(true, err);
                    else
                        callback(false, rowResult);
                });

        }
        catch (err) {
            return;
        }
    }