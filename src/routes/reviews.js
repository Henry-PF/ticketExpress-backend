const { Router } = require("express");
const router = Router();
const {
  findAll,
  createReview,
  deleteReview,
} = require("../handlers/reviewsHandler");

router.get("/get_reviews", findAll);
router.post("/create_review", createReview);
router.delete("/delete_review/:id", deleteReview);

module.exports = router;
