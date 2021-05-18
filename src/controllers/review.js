const { Product, Review, } = require("../../db.js");

const getReviews = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.json({error: "Id not recived"})
    } else {
        try {
            let data = await Review.findAll({
                where:  {
                    product_id: id
                },
                limit: 2,
                order: ['createdAt', 'DESC'],
            });    
            if(!data)   {
                return res.json({error: "there are not reviews for this product"})  
            } else {
                return res.json(data);
            }
        } catch (err) {
            res.json(err);
            console.log(err);
        }
    }   
}

const createReview = async (req, res) => {
    if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

    const product_id = req.params.id  
    const { description, rating, user_id, title } = req.body;
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
    deleteReview
}