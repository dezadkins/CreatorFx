const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Fx } = require("../../db/models");

const router = express.Router();

const fxNotFoundError = (id) => {
  const err = Error(`SoundFx with id of ${id} could not be found.`);
  err.title = "Fx not found.";
  err.status = 404;
  return err;
};

const notValidWave = () => {
  const err = Error(`Fx must be of type .wav.`);
  err.title = "Invalid File Type for Fx.";
  err.status = 400;
  return err;
};

const notValidPic = () => {
  const err = Error(`Supported file types for artwork: png/jpeg`);
  err.title = "Invalid File Type for artwork.";
  err.status = 400;
  return err;
};

router.post(
  "/",
  requireAuth,
  singleMulterUpload("audio"),
  asyncHandler(async (req, res, next) => {
    if (req.file.mimetype !== "audio/mpeg") {
      return next(notValidWave());
    }
    const fxData = req.body;
    fxData.audio = await singlePublicFileUpload(req.file);
    const fx = new Fx(fxData);
    await fx.save();
    res.json(fx);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const fxId = parseInt(req.params.id, 10);
    const fx = await Fx.findByPk(fxId);

    res.json(fx);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const fxId = parseInt(req.params.id, 10);
    const fx = await Fx.findByPk(fxId);
    await fx.destroy();

    res.json(fx);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const fxes = await Fx.findAll({
      order: [["createdAt", "DESC"]],
      include: User,
      limit: 6,
    });
    res.json(fxes);
  })
);

router.put(
  "/:id",
  requireAuth,
  singleMulterUpload("artwork"),
  asyncHandler(async (req, res, next) => {
    const fxId = parseInt(req.params.id, 10);
    const fxData = req.body;

    const fx = await Fx.findByPk(fxId);

    if (fx) {
      if (req.file) {
        fxData.artwork = await singlePublicFileUpload(req.file);
        if (
          req.file.mimetype !== "image/jpeg" &&
          req.file.mimetype !== "image/png"
        ) {
          return next(notValidPic());
        }
      }
      await fx.update({
        title: fxData.title,
        artwork: fxData.artwork,
      });
    } else {
      next(fxNotFoundError(fxId));
    }
    res.json(fx);
  })
);

module.exports = router;
