const redisClient = require("../config/redis");

exports.saveCart = async (req, res, next) => {
  try {
    const { userId, cart } = req.body;
    await redisClient.set(`cart:${userId}`, JSON.stringify(cart));
    res.json({ message: "Cart saved" });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await redisClient.get(`cart:${userId}`);
    res.json(JSON.parse(cart || "{}"));
  } catch (err) {
    next(err);
  }
};
