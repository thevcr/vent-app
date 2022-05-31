const router = require('express').Router();

const userRoutes = require('./user-routes');
const ventRoutes = require('./vent-routes');
const commentRoutes = require('./comment-routes');

router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/vents', ventRoutes);

module.exports = router;