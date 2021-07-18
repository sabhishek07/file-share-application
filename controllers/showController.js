const express = require('express');
const File = require('../models/file')


const showController = {

    async show(req, res) {

        try {
            const file = await File.findOne({
                uuid: req.params.uuid
            });
            if (!file) {
                return res.render('download', { error: 'link has been expired' })

            }
            return res.render('download', {
                uuid: file.uuid,
                fileName: file.filename,
                fileSize: file.size,
                downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`
            })

        }
        catch (error) {
            return res.render('download', { error: 'something went wrong' })

        }






    }
}

module.exports = showController;