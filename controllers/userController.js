const { User, Post } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.findAll({
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'title', 'content', 'created_at'],
                    },
                ],
            });
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // get one user
    async getUser(req, res) {
        try {
            const userData = await User.findByPk(req.params.id, {
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'title', 'content', 'created_at'],
                    },
                ],
            });
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const userData = await User.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const userData = await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(userData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // login
    async login(req, res) {
        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!userData) {
                res.status(400).json({ message: 'Incorrect email or password, please try again' });
                return;
            }
            const validPassword = await userData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect email or password, please try again' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                res.json({ user: userData, message: 'You are now logged in!' });
            });
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // logout
    async logout(req, res) {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
        else {
            res.status(404).end();
        }
    },
};