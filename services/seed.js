const { doctor } = require('../seeds/doctor')
const seedSettings = async () => {
    doctor()
}

module.exports = {
    seedSettings
};