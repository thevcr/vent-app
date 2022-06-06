const router = require('express').Router();

const userRoutes = require('./user-routes');
const ventRoutes = require('./vent-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/vents', ventRoutes);
router.use('/comments', commentRoutes);

module.exports = router;