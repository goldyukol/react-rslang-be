const { OK } = require('http-status-codes');

const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

const { validator } = require('../../utils/validation/validator');
const { wordCreate } = require('../../utils/validation/schemas');

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.get('/', async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  const words = await wordService.getAll({
    page,
    group
  });
  res.status(OK).send(words.map(word => word.toResponse()));
});

router.get('/:id', async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

const loader = multer({ dest: path.join(__dirname, 'audio') });

router.post(
  '/',
  validator(wordCreate, 'body'),
  loader.array('media', 4),
  async (req, res) => {
    try {
      const uploadedMedias = req.files.map(async fileItem => {
        const uploadedMedia = await cloudinary.uploader.upload(fileItem.path, {
          resource_type: fileItem.mimetype === 'audio/mpeg' ? 'video' : 'image'
        });

        fs.unlink(fileItem.path, err => {
          if (err) console.log(err);
        });
        return uploadedMedia;
      });

      const cloudMedias = await Promise.all(uploadedMedias);

      const wordEntity = await wordService.create(cloudMedias, req.body);
      res.status(OK).send(wordEntity.toResponse());
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
