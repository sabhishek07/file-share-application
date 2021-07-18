const express = require("express");
const File = require("../models/file");

const downloadController = {
    async download(req, res) {

        const file = await File.findOne({
            uuid: req.params.uuid
        });
        if (!file) {
            return res.render('download', { error: "Link has been epired" })

        }

        const filepath = `${__dirname}/../${file.path}`;
        res.download(filepath);





    }
}

module.exports = downloadController;