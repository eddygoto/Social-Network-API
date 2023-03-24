const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thought
router.route('/').get(getThought).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
