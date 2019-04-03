const models = require('../../../PGDB/src/models');
const Ticket = models.Ticket;
const Note = models.Note;
const User = models.User;

module.exports = (router) => {

    /**
     * Retrieves all notes for a given ticket.
     */
    router.get("/portal/ticket/notes", async (req, res) => {
        const ticket = await Ticket.findOne({
            where: {
                id: req.query.ticket_id
            }
        });

        if(!ticket) {
            return res.sendStatus(404);
        }

        const notes = await Note.findAll({
            where: {
                ticket_id: ticket.id
            }
        });

        return res.status(200).send({ticket, notes});

    });

    /**
     * Create a new note for a ticket.
     */
    router.post("/portal/ticket/notes", async (req, res) => {
        const ticket = await Ticket.findOne({
            where: {
                id: req.body.ticket_id
            }
        });

        const user = await User.fineOne({
            where: {
                username: req.body.username
            }
        });

        if(!ticket || !user) {
            return res.sendStatus(404);
        }

        const note = await Note.create({
            poster_id: user.id,
            ticket_id: ticket.id,
            message: req.body.message,
            status: req.body.status,
            type: req.body.type
        });

        return res.status(200).send({ticket, note});
    });

    /**
     * Updates a specific note for a given ticket.
     */
    router.put("/portal/ticket/notes", async (req, res) => {
        const note = await Ticket.findOne({
            where: {
                id: req.body.note_id
            }
        });

        if(!note) {
            return res.sendStatus(404);
        }

        let updatedNote = {
            message: req.body.message,
            status: req.body.status,
            type: req.body.type
        };

        const upNote = await Note.update(
            updatedNote,
            {
                where: {
                    id: note.id
                }
            }
        );

        if(upNote) {
            res.status(200).send(upNote);
        } else {
            res.status(500);
        }

    });

    /**
     * Deletes a specific note.
     */
    router.delete("/portal/ticket/notes", async (req, res) => {
        const result = await Note.destroy({
            where: {
                id: req.body.note_id
            }
        });

        return res.status(200).send({note: result});
    });

};