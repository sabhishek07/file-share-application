const express = require('express');
const File = require('../models/file');


const sendController = {
    async send(req, res) {

        const { uuid, emailTo, emailFrom } = req.body;

        //validate request

        if (!uuid || !emailTo || !emailFrom) {
            return res.status(422).send({
                error: "All Fields are required "
            })
        }
        //get data fro  database brother

        const file = await File.findOne({
            uuid: uuid
        })
        if (file.sender) {
            return res.status(422).send({
                error: "email already sent to your Email "
            })

        }

        file.sender = emailFrom;
        file.receiver = emailTo;
        const response = await file.save();


        //send email
        const sendEmail = require('../services/emailService');

        sendEmail({
            from: emailFrom,
            to: emailTo,
            subject: 'share your file here',
            text: `${emailFrom} shared a file in new way`,
            html: require('../services/emailTemplate')({
                emailFrom: emailFrom,
                downloadLink: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
                size: parseInt(file.size / 1000) + 'KB',
                expires: '24 hours'
            })


        });
        return res.send({
            sucess: true

        })


    }
}

module.exports = sendController;