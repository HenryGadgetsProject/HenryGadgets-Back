module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('brand', [
      {
        name: 'Samsung',
      },{
        name: 'Sony',
      },{
        name: 'Nikon',
      },{
        name: 'Phillips',
      },{
        name: 'Logitech',
      },{
        name: 'HyperX',
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('brand', null, {});
  }
};
