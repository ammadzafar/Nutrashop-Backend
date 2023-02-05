'use strict';
const db = require('../models');
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = await db.User.findOne({where: {email: 'admin@nutrashop.pk'}, raw: true});
    let password='nutrashop$';
    let hashed_password = await bcrypt.hash(password, 10);
    let adminRole = await db.Role.findOne({where: {name: 'admin'}, raw: true});
    if(!admin){
      await queryInterface.bulkInsert('Users', [{
        firstName: 'My',
        lastName: 'Nutrashop',
        roleId:adminRole.id,
        email: 'admin@nutrashop.pk',
        password: hashed_password,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
