const mongoose = require('mongoose');

const { Schema } = mongoose;

class Gender extends mongoose.SchemaType {
    constructor(key, options) {
        super(key, options, 'Gender');
    }

    cast(val) {
        const _val = Number(val)
        if (isNaN(_val)) {
            throw new Error('Gender: ' + val + ' is not a number');
        }
        switch (_val) {
            case 1:
                return 'Male';
            case 2:
                return 'Female';
            case 3:
                return 'Fluid Gender';
            case 4:
                return 'Other';
            default:
                throw new Error('Int8: ' + val +
                    ' is outside of the range of valid option');
        }
    }
}

mongoose.Schema.Types.Gender = Gender;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name required']
    },
    gender: {
        type: Gender,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Title required'],
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
});

module.exports = mongoose.model('User', userSchema);