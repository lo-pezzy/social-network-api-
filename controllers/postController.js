const { Post, User } = require('../models');

module.exports = {
    // get all posts for homepage
    async getAllPosts(req, res) {
        try { 
            const postData = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                ],
            });
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one post
    async getPost(req, res) {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                ],
            });
            const post = postData.get({ plain: true });
            res.render('post', {
                ...post,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create new post
    async createPost(req, res) {
        try {
            const postData = await Post.create({
                ...req.body,
                user_id: req.session.user_id,
            });
            res.status(200).json(postData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // update post
    async updatePost(req, res) {
        try {
            const postData = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!postData[0]) {
                res.status(404).json({ message: 'No post with this id!' });
                return;
            }
            res.status(200).json(postData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // delete post
    async deletePost(req, res) {
        try {
            const postData = await Post.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!postData) {
                res.status(404).json({ message: 'No post with this id!' });
                return;
            }
            res.status(200).json(postData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
