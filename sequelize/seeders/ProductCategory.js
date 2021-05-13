module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products_categories', 
	[
		{
			productId: "9feeb2bb-3b51-4c15-9abc-4d1caf5860bc",
			categoryId:"2",
		},
		{
			productId:"d7fe65a2-7aa4-4cbc-827e-f1a4e750d1f6",
			categoryId:"3",
		},
		{
			productId:"2259c3df-8c19-44ca-ae73-31614d480ba9",
			categoryId:"4",
		},
		{
			productId:"ea868843-211d-478b-a0c7-a8d6d97a371e",
			categoryId:"5",
		},
		{
			productId:"8b9c38e5-0a78-4a29-9773-98c264786f94",
			categoryId:"6",
		},
		{
			productId:"70b9bcc3-3780-443b-8182-ef56e9546367",
			categoryId:"1",
		},
	]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products_categories', null, {});
  }
};
