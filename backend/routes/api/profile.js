const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Fx } = require("../../db/models");

const router = express.Router();

const profileNotFoundError = (id) => {
  const err = Error(`SoundFx with id of ${id} could not be found.`);
  err.title = "Fx not found.";
  err.status = 404;
  return err;
};

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const fxes = await Fx.findAll({
      where: {
        userId: userId,
      },
      include: User,
    });

    if (!fxes) return next(profileNotFoundError);

    res.json(fxes);
  })
);

module.exports = router;
