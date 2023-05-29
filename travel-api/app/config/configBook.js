require('dotenv').config()

module.exports = {
    'secret' : process.env.SECRET,
    Cars: ['BUS', 'ELF', 'PICKUP'],
    Destination: ['BANDUNG', 'YOGYAKARTA', 'SURABAYA'],
    Roles: ['USER', 'ADMIN', 'PM']
}