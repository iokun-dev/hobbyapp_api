let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let role_schema = new Schema
({
    roleId: Number,
    name: String,
    RoleDisplayName: String,
    isDeleted : {type: Boolean, default: false},
    isActive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},
    { collection: 'roles' }
);

let role = mongoose.model('roles', role_schema);

module.exports = role;