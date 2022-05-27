const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./vent-routes');

router.use('/users', userRoutes);
router.use('/vents', postRoutes);

module.exports = router;
