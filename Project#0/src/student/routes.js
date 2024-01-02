const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// router.get('/', controller.getStudents);
// router.get('/:id', controller.getStudentsById);
// router.post('/', controller.addStudents);
// router.delete('/:id', controller.removeStudent);
// router.put('/:id', controller.updateStudent);
router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);
router.get('/posts/:uid', controller.getPostById);
router.post('/updateProfilePhoto/:uid', controller.updateProfilePhotoById);

module.exports = router;