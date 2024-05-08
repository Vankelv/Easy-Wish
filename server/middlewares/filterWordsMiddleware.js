const forbiddenWords = ["fuck", "fxk", "fxck", "stupid", "bitch", "womaame", "twe", "wmt"];

const filterWordsMiddleware = (req, res, next) => {
    const message = req.body.message;
    if (message) {
        const containsForbiddenWord = forbiddenWords.some(word => message.toLowerCase().includes(word));
        if (containsForbiddenWord) {
            return res.status(400).json({ message: "Your wish contains inappropriate words and cannot be submitted." });
        }
    }
    // If no forbidden words are found, continue to the next middleware/route handler
    next();
};

module.exports = filterWordsMiddleware;
