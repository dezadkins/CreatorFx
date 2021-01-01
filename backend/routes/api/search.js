const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Fx } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

const profileNotFoundError = (id) => {
  const err = Error(`Fx with id of ${id} could not be found.`);
  err.title = "Fx not found.";
  err.status = 404;
  return err;
};

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { term } = req.body;
    let fxes = await Fx.findAll({
      where: {
        title: {
          [Op.iLike]: "%" + term + "%",
        },
      },
      include: User,
    });

    let users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: "%" + term + "%",
        },
      },
    });

    res.json({ fxes, users });
  })
);

module.exports = router;
