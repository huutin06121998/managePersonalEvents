
const mongoose = require("mongoose");
const { $lt } = require("sift");
const Events = require("../models/events");
const STATUS_SUCCESS = 200;
const STATUS_NOTFOUND = 404;
const ERROR_SERVER = 500;
const MESSAGE_SERVER_ERROR = 'Server error. Please try again.';

// create new event
const createEvents = async (req, res) => {
    try {
        const { name, description, start_date, due_date } = req.body;
        const event = await new Events({
            _id: mongoose.Types.ObjectId(),
            name: name,
            description: description,
            start_date: start_date,
            due_date: due_date
        });

        return await event
            .save()
            .then((newEvent) => {
                return res.status(STATUS_SUCCESS).json({
                    success: true,
                    message: 'New events created successfully',
                    Events: newEvent,
                });
            })

    } catch (error) {
        return res.status(ERROR_SERVER).json({
            success: false,
            message: MESSAGE_SERVER_ERROR,
            error: error.message,
        });
    }
}


// Get All Events
const getAllEvents = async (req, res) => {
    try {
        await Events.find()
            .then((allEvents) => {
                return res.status(STATUS_SUCCESS).json({
                    success: true,
                    message: 'List All Events',
                    Events: allEvents,
                });
            })
    } catch (error) {
        res.status(ERROR_SERVER).json({
            success: false,
            message: MESSAGE_SERVER_ERROR,
            error: error,
        });
    }
}

// Find by ids
const getByIds = async (id) => {
    return await Events.findById(id)
}

// Update events
async function updateEvents(req, res) {
    const id = req.params.id;

    // Check event not found
    const events = await getByIds(id);
    if (!events) {
        return res.status(STATUS_NOTFOUND).json({
            status: false,
            message: 'Event not found'
        })
    }

    const updateObject = req.body;
    await Events.updateMany({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(STATUS_SUCCESS).json({
                success: true,
                message: 'Events is updated',
                updateEvents: updateObject,
            });
        })
        .catch((err) => {
            res.status(ERROR_SERVER).json({
                success: false,
                message: MESSAGE_SERVER_ERROR
            });
        });
}

// Delete events
async function deleteEvents(req, res) {
    try {
        const { id } = req.params;

        // Check event not found
        const events = await getByIds(id);
        if (!events) {
            return res.status(STATUS_NOTFOUND).json({
                status: false,
                message: 'Event not found'
            })
        }

        await Events.findByIdAndRemove(id)
            .exec()
            .then(() => res.status(STATUS_SUCCESS).json({
                success: true,
                message: 'Event was deleted'
            }))
            .catch((err) => res.status(ERROR_SERVER).json({
                success: false,
                message: MESSAGE_SERVER_ERROR
            }));
    } catch (error) {
        console.log(`Error delete events: ${error}`);
    }
}

// Sorting and pagination
async function filterEvents(req, res) {
    const dateNow = new Date(Date.now());
    let { page, size } = req.query;

    if (!page) {
        page = 1
    }
    if (!size) {
        size = 10
    }

    const limit = parseInt(size)
    const skip = (page - 1) * size

    try {

        const data = await Events
            .find({
                due_date: { $lt: dateNow }
            })
            .sort({ created_at: -1 })
            .limit(limit)
            .skip(skip);

        const totalEvents = await Events.countDocuments();

        res.send({
            page: page,
            total: totalEvents,
            data: data,
        });

    } catch (error) {
        console.log(`Error filter events: ${error}`);
    }
}

module.exports = {
    createEvents,
    getAllEvents,
    updateEvents,
    deleteEvents,
    filterEvents,
};
