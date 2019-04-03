const models = require('../../../PGDB/src/models');
const request = require('request');
const Ticket = models.Ticket;
const Note = models.Note;
const Ownership = models.Ownership;
const User = models.User;

module.exports = (router) => {

    /**
     * Retrieves all tickets that the user is participating in.
     */
    router.get('/portal/ticket/', async (req, res) => {

        const ownerships = await Ownership.findAll({
            where: {
                owner_id: req.query.user_id
            }
        });

        const tickets = [];

        for(let i = 0; i < ownerships.length; i++) {
            const ticket = await Ticket.findOne({
                where: {
                    id: ownerships[i].ticket_id
                }
            });

            const notes = await Note.findAll({
                where: {
                    ticket_id: ticket.id
                }
            });

            tickets.push({ticket, notes});
        }

        if(tickets.length > 0) {
            res.status(200).send(tickets);
        } else {
            res.sendStatus(404);
        }
    });

    /**
     * Retrieves all tickets if the user is a director/administrator.
     * Needs perm level of 2.
     */
    router.get('/portal/ticket/all', async (req, res) => {
        
        const user = await User.findOne({
            where: {
                username: req.query.username
            }
        });

        if(user.permissions != 2) {
            return res.sendStatus(401);
        } else {
            const tickets = await Ticket.findAll({});
            return res.status(200).send(tickets);
        }
    });

    /**
     * Creates a new ticket along with the ownership fields for the
     * individual creating the ticket and who it's for.
     */
    router.post('/portal/ticket/', async (req, res) => {

        if(!req.body.assignee || !req.body.assigner) {
            return res.sendStatus(400);
        }

        const assignee = await User.findOne({
            where: {
                username: req.body.assignee
            }
        });

        const assigner = await User.findOne({
            where: {
                username: req.body.assigner
            }
        });

        if(!assignee || ! assigner) {
            return res.sendStatus(400);
        }

        const ticket = await Ticket.create({
            status: 0
        });

        const ownershipAssignee = await Ownership.create({
            owner_id: req.body.assignee,
            ticket_id: ticket.id
        });

        const ownershipAssigner = await Ownership.create({
            owner_id: req.body.assigner,
            ticket_id: ticket.id
        });

        res.status(200).send({ticket, ownershipAssignee, ownershipAssigner});
    });

    /**
     * Adds a new assignee to the ticket.
     */
    router.post('/portal/ticket/add_assignee', async (req, res) => {

        if(!req.body.assignee || !req.body.ticket_id) {
            return res.sendStatus(400);
        }

        const ownershipAssignee = await Ownership.findOne({
            where: {
                owner_id: req.body.assigner,
                ticket_id: req.body.ticket_id
            }
        });

        const assignee = await User.findOne({
            where: {
                username: req.body.assignee
            }
        });

        if(!assignee) {
            return res.sendStatus(400);
        }

        if(ownershipAssignee) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(await Ownership.create({
                owner_id: assignee.id,
                ticket_id: req.body.ticket_id
            }));
        }

    });
    
    /**
     * Updates an existing ticket and notifies all participants that an
     * update has been made through an email.
     */
    router.put('/portal/ticket/', async (req, res) => {

        const ticket = await Ticket.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.ticket_id
            }
        });

        const participants = await Ownership.findAll({
            where: {
                ticket_id: req.body.ticket_id
            }
        });

        for(let i = 0; i < participants.length; i++) {

            let user = await User.findOne({
                where: {
                    id: participants[i].owner_id
                }
            });

            request.post({
                url: 'http://localhost:4000/email/ticket',
                form: {username: user.username, ticket_id: ticket.id}
            });
        }

        if(ticket) {
            res.status(200).send(ticket);
        } else {
            res.sendStatus(500);
        }
    });

    /**
     * Deletes a ticket, along with the ownerships that are related to the ticket.
     */
    router.delete('/portal/ticket/', async (req, res) => {

        const result = await Ticket.destroy({
            where: {
                ticket_id: req.body.ticket_id
            }
        });

        const notesDeletion = await Note.destroy({
            where: {
                ticket_id: req.body.ticket_id
            }
        });

        const ownershipDeletion = await Ownership.destroy({
            where: {
                ticket_id: req.body.ticket_id
            }
        });

        res.status(200).send({tickets: result, ownerships: ownershipDeletion, notes: notesDeletion});

    });

};