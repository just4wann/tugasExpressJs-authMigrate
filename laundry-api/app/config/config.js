require('dotenv').config();

module.exports = {
    'secret' : process.env.SECRET,
    STAtus: ['PROCESS', 'FINISH', 'PENDING']
}