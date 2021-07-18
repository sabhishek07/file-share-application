const express = require("express");
const router = require('express').Router();
const fileController = require("../controllers/fileController");
const showController = require("../controllers/showController");
const downloadController = require('../controllers/downloadController');
const sendController = require("../controllers/sendController");



router.post('/files', fileController.file)
router.post('/files/send', sendController.send)
router.get('/files/:uuid', showController.show)
router.get('/files/download/:uuid', downloadController.download);

module.exports = router;
