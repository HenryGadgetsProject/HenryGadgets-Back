module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("product", [
      {
        id: "9feeb2bb-3b51-4c15-9abc-4d1caf5860bc",
        name: "PS5",
        price: "32000",
        rating: 4,
        big_image: "https://www.techinn.com/f/13776/137769821/sony-ps5.jpg",
        description: " Experimenta cargas superrápidas gracias a una unidad de estado sólido (SSD) de alta velocidad, una inmersión más profunda con retroalimentación háptica, gatillos adaptables y audio 3D.",
        is_active: true,
        stock: 30,
        brandId: '2',
        categories: [{
            id: 1,
            name: "Computacion"
        },
        {
            id: 2,
            name: "Celulares",
        }],
    },
    {
        id: "d7fe65a2-7aa4-4cbc-827e-f1a4e750d1f6",
        name: "Cámara Nikon",
        price: "9000",
        rating: 5,
        big_image: "https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8kHbA0MlEAVn2W1yKXB-B_2zEtiAgzBX5TShX8lUMVnxSs0ATXqRnkGA==/Views/25492_D3200_front.png",
        description: "Captura mejor tus momentos con su cámara de 50mm",
        category: [3],
        is_active: true,
        stock: 20,
        brandId: '3',
    },
    {
        id: "2259c3df-8c19-44ca-ae73-31614d480ba9",
        name: "Auriculares Phillips",
        price: "8000",
        rating: 4,
        big_image: "https://www.tiomusa.com.ar/imagenes/archivos/2020-10/26815-auricularvinchaphilipstah4205bk.jpg",
        description: "Escuchar música nunca fué tan placentero.",
        category: [5],
        is_active: true,
        stock: 10,
        brandId: '4'
    },
    {
        id: "ea868843-211d-478b-a0c7-a8d6d97a371e",
        name: "Mouse Logitech RGB",
        price: "2400",
        rating: 4,
        big_image: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-logitech-g203-0.jpg",
        description: "Con sus 3000 DPI aumenta tu presición tanto en diseño gráfico como en videojuegos.",
        category: [1],
        is_active: false,
        stock: 0,
        brandId: '5'
    },
    {
        id: "8b9c38e5-0a78-4a29-9773-98c264786f94",
        name: "Teclado RGB HyperX",
        price: "6800",
        rating: 5,
        big_image: "https://media.kingston.com/hyperx/product/hx-product-keyboard-alloy-origins-core-no-3-zm-lg.jpg",
        description: "Teclado Mecánico",
        category: [1],
        is_active: false,
        stock: 0,
        brandId: '6'
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e9546367",
        name: "SmartPhone SAMSUNG",
        price: "46000",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_879201-MLA44443256851_122020-O.webp",
        description: "Samsung Galaxy A51 128 GB.Liberado",
        category: [2],
        is_active: true,
        stock: 120,
        brandId: '1'
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product", null, {});
  },
};
