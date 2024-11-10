const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getPosts);
router.get('/:pid', controller.getPostsById);
router.post('/', controller.addPosts);
router.post('/comment/:pid', controller.addComments);
router.get('/comment/:pid', controller.getCommentById);
router.post('/like/:pid', controller.addLikes);

module.exports = router;