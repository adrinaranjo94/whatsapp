const Message = require("../models/Message");

const getChat = async (req, res) => {
  try {
    const uid = req.uid;

    const fromUid = req.params.from;

    const messages = await Message.find({
      $or: [
        { from: uid, to: fromUid },
        { from: fromUid, to: uid },
      ],
    }).sort({ createdAt: "asc" });

    return res.json({
      ok: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error",
    });
  }
};

module.exports = { getChat };
