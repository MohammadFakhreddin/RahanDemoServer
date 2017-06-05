/**
 * Created by M.Fakhreddin on 04/06/2017.
 */
var Mongoose = require("mongoose");

var Loc = new Mongoose.Schema({
    lang: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
});

var Task = new Mongoose.Schema({
    // scId: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false,
        default: new Date()
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskMode: {
        type: Number,
        required: true
    },
    attachedLocation: {
        type: Loc,
        required: false,
        default: null
    },
    locationAddress: {
        type: String,
        required: true
    },
    hasAttachedLocation: {
        type: Boolean,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    canReAssign: {
        type: Boolean,
        required: true
    },
    department: {
        type: Number,
        required: true
    }
});

var User = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    tasks: [Task]
});

User.virtual('sessionV0').get(function () {
    return {
        username: this.username,
        _id: this._id,
        password: this.password,
        department: this.department
    }
});

User.index({'username': 1, 'password': 1});
Task.index({'department': 1});

exports.User = Mongoose.model('User', User);
exports.Task = Mongoose.model('Task', Task);