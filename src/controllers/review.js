const { Product, Review, OrderDetail, Order, User } = require("../../db.js");

const getReviews = async (req, res) => {
    let { id } = req.params;
  
    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAll({
        where:{
          product_id: id
        },  
        order: [
          ['createdAt', 'DESC']
        ],
        include:[{
          model: OrderDetail,
          include: [{
            model: Order,
            attributes: ['user_id']
          }]
        }, {model: User}]
      });
      let usersCommented = await Review.findAll({
        where: {
          product_id: id
        },
        attributes: ['user_id']
      });
      console.log(usersCommented)
      let arrUsersCommented = usersCommented?.map(e => e.dataValues.user_id);
  
  
      if(!data) return res.json({error: "there are not reviews for this product"})
      return res.json({data, arrUsersCommented});
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
}

const getReviewsByUserId = async (req, res) => {
  let { userId } = req.params;

  if (!userId) return res.json({ error: "please, give us an userId" })
  try {
    let data = await Review.findAll({
      where: {
        user_id: userId
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: OrderDetail,
        include: [{
          model: Order,
          attributes: ['user_id']
        }]
      }, { model: User }]
    });
    return res.json({ data });
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
}

const reviewAverage = async (req, res) => {
    const { id } = req.params;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAndCountAll({
        where:{
          product_id: id
        }
      });

      if(!data) return res.json({error: "there are no reviews for this product"});

      let findSum = data.rows?.map(e => parseInt(e.rating));
      let result = (findSum?.reduce((a,b) => a+b, 0)) / data.count;
      
      return res.json(result);
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
}

const createReview = async (req, res) => {
    console.log(req.body);
    if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

    const product_id = req.params.id  
    const { description, rating, user_id, title } = req.body;
    console.log(description, rating, user_id, title );
    try { 
        const addReview = await Review.findOrCreate({
            where: {
              rating,
              title,
              description
            },
        });

        const created = await Review.findOne({
            where: {
                title,
                description
            },
        });

        const findProduct = await Product.findOne({
            where: {
                id: product_id
            },
        });
        await created.setProduct(findProduct);
        await created.setUser(user_id);
    
        return res.json(created);
    } catch (err) {
        console.log(err);
        res.json({ error: 'an error occurred while loading the data' });
    }
};

const editReview = async (req, res) => {
    if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

    let id = req.params.id;
    let {title, rating, description} = req.body;
  
    if (!id) return res.json({ error: "please, give us an id" });
    try {
      let data = await Review.findByPk(id);
  
      if (data) {
        if(description) data.update({description});
        if(rating) data.update({rating});
        if(title) data.update({title});
      } else {
          return res.json({ error: "there are not reviews with this ID" });
      }
      return res.json(data);
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
};

const deleteReview = async (req, res) => {
    if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

    let id = req.params.id;
    if(!id) return res.json({error: "please, give us an id"})
    try {
        let data = await Review.findByPk(id);
  
        if(!data) return res.json({error: "the review does not exist"})
  
        data.destroy()
        return res.json({success: "the review was deleted succesfully"});
    } catch (err) {
        res.json(err);
        return console.log(err);
    }
};

module.exports = {
  getReviews,
  createReview,
  editReview,
  deleteReview,
  getReviewsByUserId,
  reviewAverage
}