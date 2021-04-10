const router = require('express').Router();

const controller = require('./../controllers/teachers');

router
  .route('/')
  .get(controller.get_all_teachers)
  .post(controller.create_teacher);

router
  .route('/:id')
  .get(controller.get_teacher)
  .patch(controller.update_teacher)
  .delete(controller.delete_teacher);

module.exports = router;
