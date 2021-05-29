const { Router } = require("express");
const { getReviews, createReview, editReview, deleteReview, getReviewsByUserId } = require("../controllers/review");
//const isAuthorize = require("../middlewares/isAuthorize")
const router = Router();


router.get("/:id", getReviews);
router.post("/:id", createReview);
router.put("/:id", editReview);
router.delete("/:id", deleteReview);
router.get("/user/:userId", getReviewsByUserId);






module.exports = router;