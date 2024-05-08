const Wishes = require ("../models/wishes.js")

exports.getAllWishes = async (req, res) => {
    try {
        // Retrieve all wishes from the database
        const wishes = await Wishes.find();
        res.json(wishes); 
      } catch (error) {
        console.error('Error retrieving wishes:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

// Controller function to create a new wish
exports.createWish = async (req, res) => {
    try {
        const wishes = new Wishes(req.body);
        await wishes.save();
        res.json(wishes);
    } catch (err) {
        console.error("Error creating new wish:", err);
        res.status(500).json({ message: "Error creating new wish" });
    }
};
