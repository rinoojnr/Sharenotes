const User = require('../Models/user');
const Notes = require('../Models/notes');

exports.createNotes = (req, res) => {
    const {category, language, title, content, image} = req.body;
    User.findOne({userid: req.user.userid})
    .then((result) => {
        Notes.create({
            userid: result._id,
            category: category,
            language: language,
            title: title,
            content: content,
            image: image
        });
    });
}