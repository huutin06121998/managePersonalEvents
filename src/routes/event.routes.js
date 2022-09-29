const express = require('express');

const {
    createEvents,
    getAllEvents,
    updateEvents,
    deleteEvents,
    filterEvents,

} = require('../controllers/event.controllers');

const router = express.Router();

// Middleware
const { verifyToken, checkUser } = require('../middlewares/checkAuth.middleware');

// Verify token
router.use(verifyToken);

// Call router
router.post('/events', checkUser, createEvents);
router.get('/events', checkUser, getAllEvents);
router.patch('/events/:id', checkUser, updateEvents);
router.delete('/events/:id', checkUser, deleteEvents);
router.get('/events/filter', checkUser, filterEvents);

module.exports = router;