const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/nmodb');\

//TRY sequelize above first, if it doesn't work try the one below

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   protocol: 'postgres',
//   port: 5432,
//   host: 'ec2-52-24-208-121.us-west-2.compute.amazonaws.com',
//   dialectOptions: {
//     ssl: true,
//   },
//   logging: false,
//   define: {
//     timestamps: false
//   }
// });
