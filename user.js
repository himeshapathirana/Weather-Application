const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    weatherReports: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            weatherData: String
        }
    ]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            console.log('Password hashed successfully');
        } catch (err) {
            console.error('Error hashing password:', err);
            next(err);
        }
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
