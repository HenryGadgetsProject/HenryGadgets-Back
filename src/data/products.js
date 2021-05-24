const products = [
    {
        id: "9feeb2bb-3b51-4c15-9abc-4d1caf5860bc",
        name: "PS5",
        price: "32000",
        rating: 4,
        big_image: "https://www.techinn.com/f/13776/137769821/sony-ps5.jpg",
        description: " Experimenta cargas superrápidas gracias a una unidad de estado sólido (SSD) de alta velocidad, una inmersión más profunda con retroalimentación háptica, gatillos adaptables y audio 3D.",
        is_active: true,
        stock: 30,
        categories: [4]
    },
    {
        id: "9feeb2bb-3b51-4c15-9abc-4d1caf5860cf",
        name: "Joystick inalámbrico Sony PS4",
        price: "9000",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_898103-MLA32556737376_102019-O.webp",
        description: "Joystick inalámbrico Sony Dualshock 4 jet black",
        is_active: true,
        stock: 120,
        categories: [4]
    },
    {
        id: "9feeb2bb-3b51-4c15-9abc-4d1caf5860ca",
        name: "Nintendo Switch",
        price: "69999",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_883371-MLA32731749246_112019-O.webp",
        description: "Nintendo Switch 32GB Standard color rojo neón, azul neón y negro",
        is_active: true,
        stock: 120,
        categories: [4]
    },
    {
        id: "9feeb2bb-3b51-4c15-9abc-4d1caf5860bb",
        name: "Sony PlayStation 4",
        price: "59980",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_752561-MLA32731813778_112019-O.webp",
        description: "Nintendo Switch 32GB Standard color rojo neón, azul neón y negro",
        is_active: true,
        stock: 10,
        categories: [4]
    },
    {
        id: "d7fe65a2-7aa4-4cbc-827e-f1a4e750d1f6",
        name: "Cámara Nikon",
        price: "9000",
        rating: 5,
        big_image: "https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8kHbA0MlEAVn2W1yKXB-B_2zEtiAgzBX5TShX8lUMVnxSs0ATXqRnkGA==/Views/25492_D3200_front.png",
        description: "Captura mejor tus momentos con su cámara de 50mm",
        categories: [3],
        is_active: true,
        stock: 20,
    },
    {
        id: "2259c3df-8c19-44ca-ae73-31614d480ba9",
        name: "Auriculares Phillips",
        price: "8000",
        rating: 4,
        big_image: "https://www.tiomusa.com.ar/imagenes/archivos/2020-10/26815-auricularvinchaphilipstah4205bk.jpg",
        description: "Escuchar música nunca fué tan placentero.",
        categories: [5],
        is_active: true,
        stock: 10,
    },
    {
        id: "ea868843-211d-478b-a0c7-a8d6d97a371e",
        name: "Mouse Logitech RGB",
        price: "2400",
        rating: 4,
        big_image: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-logitech-g203-0.jpg",
        description: "Con sus 3000 DPI aumenta tu presición tanto en diseño gráfico como en videojuegos.",
        categories: [1],
        is_active: false,
        stock: 0,
    },
    {
        id: "ea868843-211d-478b-a0c7-a8d6d97a371f",
        name: "Placa de video Nvidia",
        price: "69900",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_826187-MLA32007146821_082019-O.webp",
        description: "Placa de video Nvidia Gigabyte GeForce GTX 10 Series GTX 1050 Ti GV-N105TOC-4GL OC Edition 4GB",
        categories: [1],
        is_active: true,
        stock: 10,
    },
    {
        id: "8b9c38e5-0a78-4a29-9773-98c264786f94",
        name: "Teclado RGB HyperX",
        price: "6800",
        rating: 5,
        big_image: "https://media.kingston.com/hyperx/product/hx-product-keyboard-alloy-origins-core-no-3-zm-lg.jpg",
        description: "Teclado Mecánico",
        categories: [1],
        is_active: false,
        stock: 0,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e9546367",
        name: "SmartPhone SAMSUNG",
        price: "46000",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_879201-MLA44443256851_122020-O.webp",
        description: "Samsung Galaxy A51 128 GB.Liberado",
        categories: [2],
        is_active: true,
        stock: 120,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e9546345",
        name: "SmartPhone Xiaomi",
        price: "32000",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_818899-MLA43159149904_082020-O.webp",
        description: "Xiaomi Redmi 9 (Global) Dual SIM 64 GB carbon grey 4 GB RAM",
        categories: [2],
        is_active: true,
        stock: 150,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e9541520",
        name: "SmartPhone TCL",
        price: "28400",
        rating: 2,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_708457-MLA44982721770_022021-O.webp",
        description: "TCL 10 SE 128 GB polar night 4 GB RAM",
        categories: [2],
        is_active: true,
        stock: 450,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468701",
        name: "Camara digital NIKON",
        price: "24200",
        rating:4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_839191-MLA31598738202_072019-O.webp",
        description: "Nikon D5300 Reflex + Kit 18-55mm Original Y Nuevo Garantía",
        categories: [3],
        is_active: false,
        stock: 50,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468711",
        name: "Camara Cannon",
        price: "46200",
        rating:4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_853936-MLA33026157594_112019-O.webp",
        description: "Canon PowerShot SX540 HS compacta avanzada color negro",
        categories: [3],
        is_active: false,
        stock: 80,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468791",
        name: "Camara Sony",
        price: "72200",
        rating:3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_781135-MLA40041734414_122019-O.webp",
        description: "Sony Cyber-shot H300 compacta avanzada color negro",
        categories: [3],
        is_active: false,
        stock: 80,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468700",
        name: "Smart TV Tedge",
        price: "46200",
        rating:2,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_774646-MLA43196387330_082020-O.webp",
        description: "Smart TV Tedge Led 50 pulgadas NTV504K LED 4K 50 220V",
        categories: [6],
        is_active: true,
        stock: 112,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468703",
        name: "Smart TV Samsung",
        price: "61700",
        rating:5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_878604-MLA44160072739_112020-O.webp",
        description: "Smart TV Samsung Series 7 UN50TU7000GCZB LED 4K 50 220V - 240V",
        categories: [6],
        is_active: false,
        stock: 12,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468903",
        name: "Notebook Asus",
        price: "40700",
        rating:4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_878604-MLA44160072739_112020-O.webp",
        description: "Notebook Asus N4020 64gb Ssd 4gb Windows 10 14 E410ma-211",
        categories: [1],
        is_active: true,
        stock: 72,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468733",
        name: "Notebook Lenovo",
        price: "98700",
        rating:5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_868921-MLA44927459461_022021-O.webp",
        description: "Notebook Lenovo Ideapad S145-15iil Core I3 4gb 1tb Win 10",
        categories: [1],
        is_active: true,
        stock: 52,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468743",
        name: "Notebook Lenovo IdeaPad",
        price: "99700",
        rating:5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_879170-MLA45629747467_042021-O.webp",
        description: "Notebook Lenovo IdeaPad 14IIL05 platinum gray 14 Intel Core i5 1035G1 8GB de RAM 512GB SSD, Intel UHD Graphics 1920x1080px Windows 10 Home",
        categories: [1],
        is_active: true,
        stock: 22,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468150",
        name: "Parlante Thonet",
        price: "30700",
        rating:3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_820121-MLA41986370366_052020-O.webp  ",
        description: "Parlante Thonet & Vander Vertrag BT con bluetooth white",
        categories: [5],
        is_active: true,
        stock: 62,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468560",
        name: "Parlante Philco",
        price: "15200",
        rating:4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_999560-MLA42033648941_062020-O.webp",
        description: "Parlante Philco TAP350 portátil con bluetooth negra 220V",
        categories: [5],
        is_active: true,
        stock: 19,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468780",
        name: "Auriculares In-ear",
        price: "2700",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_825073-MLA40760731794_022020-O.webp",
        description: "Auriculares In-ear inalámbricos Haylou GT1 Pro negro",
        categories: [5],
        is_active: true,
        stock: 17,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468990",
        name: "Router TP-Link",
        price: "5900",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_632064-MLA31786141449_082019-O.webp",
        description: "Router, Access point, Range extender TP-Link TL-WR941HP negro",
        categories: [1],
        is_active: false,
        stock: 0,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468000",
        name: "Mouse Gamer",
        price: "2800",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_779763-MLA45385615296_032021-O.webp",
        description: "Mouse de juego Logitech G Series Lightsync G203 negro",
        categories: [1],
        is_active: true,
        stock: 30,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468001",
        name: "Teclado gamer Nisuta",
        price: "7800",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_777481-MLA42140820983_062020-O.webp",
        description: "Teclado gamer Nisuta NSKBGZ61 QWERTY OUTEMU Brown español España color negro con luz RGB",
        categories: [1],
        is_active: true,
        stock: 50,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468003",
        name: "Teclado gamer bluetooth",
        price: "7200",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_844015-MLA43558247924_092020-O.webp",
        description: "Teclado gamer Nisuta NSKBGZ61 QWERTY OUTEMU Brown español España color negro con luz RGB",
        categories: [1],
        is_active: true,
        stock: 150,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468005",
        name: "Consola Mini Family Game",
        price: "3200",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_628678-MLA45412783549_042021-O.webp",
        description: "Consola Mini Family Game 1000 Juegos Clásicos 2 Joysticks",
        categories: [4],
        is_active: true,
        stock: 10,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468010",
        name: "Consola Sega Genesis",
        price: "5200",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_758806-MLA46033664016_052021-O.webp",
        description: "Consolas Portatiles Gameboy Y Sega Mas De 3000 Juegos",
        categories: [4],
        is_active: true,
        stock: 10,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468011",
        name: "Consola Sony PlayStation Classic",
        price: "15200",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_714949-MLA40070943174_122019-O.webp",
        description: "Sony PlayStation Classic SCPH-1000R 16GB color gris",
        categories: [4],
        is_active: false,
        stock: 0,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468013",
        name: "PS4 FIFA 21",
        price: "5200",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_759309-MLA43440788936_092020-O.webp",
        description: "FIFA 21 Standard Edition Electronic Arts PS4 Físico",
        categories: [4],
        is_active: false,
        stock: 0,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468019",
        name: "PS4 FIFA 21",
        price: "17900",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_910960-MLA32731749007_112019-O.webp",
        description: "Nintendo Wii 512MB Standard color blanco",
        categories: [4],
        is_active: true,
        stock: 10,
    },
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468020",
        name: "Consola Level UP",
        price: "4900",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_623404-MLA44436119979_122020-O.webp",
        description: "Consola Level Up Retro Nes AV color gris",
        categories: [4],
        is_active: true,
        stock: 3,
    },  
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468021",
        name: "Smartphone Moto G9 Power",
        price: "34900",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_863700-MLA44912582105_022021-O.webp",
        description: "Moto G9 Power Xt2091-4 Verde Granito",
        categories: [2],
        is_active: true,
        stock: 43,
    },  
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468022",
        name: "Smartphone Motorola Edge",
        price: "97900",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_911598-MLA43469097950_092020-O.webp",
        description: "Motorola Edge 128 GB gris midnight 6 GB RAM",
        categories: [2],
        is_active: true,
        stock: 143,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468030",
        name: "Smartphone LG Velvet",
        price: "74900",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_935041-MLA44170392538_112020-O.webp",
        description: "LG Velvet 128 GB aurora silver 6 GB RAM",
        categories: [2],
        is_active: true,
        stock: 783,
    },  
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468032",
        name: "iPhone SE",
        price: "95900",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_762949-MLA42320762601_062020-O.webp",
        description: "iPhone SE (2nd Generation) 64 GB negro",
        categories: [2],
        is_active: true,
        stock: 13,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468033",
        name: "Nokia 23",
        price: "15900",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_828063-MLA44280741156_122020-O.webp",
        description: "Nokia 23 M 32 GB gris carbón 2 GB RAM",
        categories: [2],
        is_active: true,
        stock: 113,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468034",
        name: "Samsung Galaxy A10s",
        price: "29900",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_636793-MLA40452533147_012020-O.webp",
        description: "Samsung Galaxy A10s Dual SIM 32 GB azul 2 GB RAM",
        categories: [2],
        is_active: false,
        stock: 0,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468035",
        name: "Smart TV Philips",
        price: "59900",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_771965-MLA31522492188_072019-O.webp",
        description: "Smart TV Philips 5000 Series 43PFG5813/77 LED Full HD 43 110V/240V",
        categories: [6],
        is_active: true,
        stock: 10,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468036",
        name: "Smart TV Noblex",
        price: "46900",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_966270-MLA44282592566_122020-O.webp",
        description: "Smart TV Noblex DM43X7100 LED Full HD 43 220V",
        categories: [6],
        is_active: true,
        stock: 10,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468037",
        name: "Auriculares gamer",
        price: "7100",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_966270-MLA44282592566_122020-O.webp",
        description: "Auriculares gamer Redragon Zeus black y red",
        categories: [5],
        is_active: true,
        stock: 100,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468038",
        name: "Auriculares Sennheiser",
        price: "1100",
        rating: 4,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_927934-MLA41255110706_032020-O.webp",
        description: "Auriculares Sennheiser HD 206 plateado",
        categories: [5],
        is_active: true,
        stock: 80,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468039",
        name: "Auriculares inalámbricos",
        price: "1700",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_753944-MLA42762061958_072020-O.webp",
        description: "Auriculares inalámbricos Tedge BLHPHONE1 negro",
        categories: [5],
        is_active: true,
        stock: 200,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468040",
        name: "Lente Camara Zoom",
        price: "5700",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_690631-MLA44940072666_022021-O.webp",
        description: "Lente Camara Zoom Wi-fi Kodak Pixpro Sl10 Para Celular Foto",
        categories: [3],
        is_active: false,
        stock: 0,
    },  
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468041",
        name: "Camara Nikon",
        price: "51700",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_867567-MLA43122948062_082020-O.webp",
        description: "Camara Nikon Semi Reflex Coolpix B500 16mp. 40x Zoom Optic",
        categories: [3],
        is_active: true,
        stock: 3,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468042",
        name: "Lente Telefoto",
        price: "11700",
        rating: 3,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_690645-MLA43883904051_102020-O.webp",
        description: "Lente Telefoto Apexel High Power 28x Hd Teléfono Con Remoto",
        categories: [3],
        is_active: true,
        stock: 123,
    }, 
    {
        id: "70b9bcc3-3780-443b-8182-ef56e5468043",
        name: "Nikon Reflex",
        price: "91700",
        rating: 5,
        big_image: "https://http2.mlstatic.com/D_NQ_NP_958646-MLA44628053747_012021-O.webp",
        description: "Nikon Reflex D3500 Kit 18-55mm Unica Con Garantia Oficial",
        categories: [3],
        is_active: true,
        stock: 13,
    },  
  
 


];

module.exports = products
