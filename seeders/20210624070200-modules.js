'use strict';
const data=require('../data/modules')
const db = require('../models');
const Role=db.roles
const Module=db.modules
module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const module of data.modules) {
      let md = await Module.findOne({where: {name: module.name}, raw: true});
      if (!md) {
        await queryInterface.bulkInsert('Modules', [module])
        let adminRole = await Role.findOne({where: {name: 'admin'}, raw: true});
        let md= await Module.findOne({where: {name: module.name}, raw: true})
          let moduleRoleObject={
            moduleId:md.id,
            roleId:adminRole.id,
            permission:'write',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        await queryInterface.bulkInsert('ModuleRoles',[moduleRoleObject])
      }
    }
    return
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
