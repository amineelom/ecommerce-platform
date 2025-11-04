const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/product/:productId', auth, reviewController.createReview);
router.put('/:reviewId', auth, reviewController.updateReview);
router.delete('/:reviewId', auth, reviewController.deleteReview);
router.post('/:reviewId/helpful', auth, reviewController.markHelpful);
router.post('/:reviewId/unhelpful', auth, reviewController.markUnhelpful);

module.exports = router;
