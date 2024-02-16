const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: String,
    gender: String,
    dateOfBirth: Date,
    weight: Number,
    height: Number,
    horoscope: String,
    zodiac: String,
    interests: [{ type: String }]
});

// Generate horoscope and zodiac signs based on the user's date of birth
userSchema.pre('save', function(next) {
    const dateOfBirth = this.dateOfBirth;
    if (dateOfBirth) {
        // Extract month and day from date of birth
        const month = dateOfBirth.getMonth() + 1;
        const day = dateOfBirth.getDate();

        // Generate horoscope based on month and day
        const horoscope = generateHoroscope(month, day);
        this.horoscope = horoscope;

        // Generate zodiac based on year of birth
        const year = dateOfBirth.getFullYear();
        const zodiac = generateZodiac(year);
        this.zodiac = zodiac;
    }
    next();
});

// Function to generate horoscope based on month and day
function generateHoroscope(month, day) {
    // Your logic to generate horoscope based on month and day
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        return 'Aquarius';
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return 'Pisces';
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        return 'Aries';
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        return 'Taurus';
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return 'Gemini';
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        return 'Cancer';
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        return 'Leo';
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        return 'Virgo';
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        return 'Libra';
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        return 'Scorpio';
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        return 'Sagittarius';
    } else {
        return 'Capricorn';
    }
}


// Function to generate zodiac based on year of birth
function generateZodiac(year) {
    // Logic to generate zodiac based on year of birth
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const index = (year - 4) % 12;
    return zodiacSigns[index];
}


const User = mongoose.model('User', userSchema);

module.exports = User;
