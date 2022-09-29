// Call services
const eventService = require('../services/event.services');

// Sorting and pagination
const filterEvents = async (req, res) => {
    return await eventService.filterEvents(req, res)
}

// Create event
const createEvents = async (req, res) => {
    return await eventService.createEvents(req, res);
}

// Update event
const updateEvents = async (req, res) => {
    return await eventService.updateEvents(req, res);
}

// Get all events
const getAllEvents = async (req, res) => {
    return await eventService.getAllEvents(req, res);
}

// Delete events
const deleteEvents = async (req, res) => {
    return await eventService.deleteEvents(req, res);
}

module.exports = {
    createEvents,
    getAllEvents,
    updateEvents,
    deleteEvents,
    filterEvents,
};
