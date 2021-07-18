const express = require('express');
const multer = require('multer');
const File = require('../models/file');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }

})

let upload = multer({
    storage: storage,
    limit: { fileSize: 100000 * 100 }
}).single('myfile');

const fileController = {
    async file(req, res) {

        //validate

        //store file
        upload(req, res, async (err) => {

            if (!req.file) {
                return res.json({
                    error: "all fields are required"
                })
            }
            if (err) {
                return res.status(500).send({
                    error: "err.message"
                })
            }
            const { filname, path, size } = req.body;
            //store in database

            const file = new File({
                filename: req.file.filename,
                uuid: uuidv4(),
                path: req.file.path,
                size: req.file.size

            });

            const response = await file.save();
            return res.json({
                file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
            });

        })

    }
}

module.exports = fileController;