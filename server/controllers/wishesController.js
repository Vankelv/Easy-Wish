const Wishes = require ("../models/wishes.js")

exports.getAllWishes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalWishes = await Wishes.countDocuments({});
        const totalPages = Math.ceil(totalWishes / limit);

        // Retrieve wishes with pagination
        const wishes = await Wishes.find()
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit);
            const wishesWithImages = wishes.map((wish) => {
                return {
                    ...wish,
                    avatarUrl: `/public/uploads/${wish.avatar}`,
                };
            });
    
        res.json({ wishes, wishesWithImages, totalPages  });
    } catch (error) {
        console.error('Error retrieving wishes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function to create a new wish
exports.createWish = async (req, res) => {
    try {
        const wishes = new Wishes(req.body);
        if (req.file){
            wishes.avatar = req.file.path; 
        }
        await wishes.save();
        res.json(wishes);
    } catch (err) {
        console.error("Error creating new wish:", err);
        res.status(500).json({ message: "Error creating new wish" });
    }
};
