const userEmailModel = require("../models/userEmail")
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
var key = require("./key.json")
const { google } = require('googleapis');
const path = require('path');
const User = require("../models/User");
var fs = require('fs');
const handlebars = require('handlebars')
const pdf = require('html-pdf');
const { type } = require("os");


exports.sendEmail = async (req, res) => {

    if (req.body.email) {
        const CLIENT_ID = '394351948978-3ii40mtp82ipml822qa9k6gvjrd4voa8.apps.googleusercontent.com';
        const CLEINT_SECRET = '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';
        const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
        const REFRESH_TOKEN = '1//04TrzPYXrrpTXCgYIARAAGAQSNwF-L9IrEgCWxsB67CtguwzrwWr3SVLXxd2n0guT_sQ-tIRRIsQYmmDld2UgFyP9Rl2l0ZLAago';

        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLEINT_SECRET,
            REDIRECT_URI
        );
//  title,
// email,
// title,
// size,
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        try {
            const filePath = path.join(__dirname, '/templates/send.html');
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);
            const replacements = {
                title: req.body.title,
                year: req.body.year,
                size: req.body.size,
                image:`http://api.dianam.art/products/${req.body.image}`
            };
           
            const htmlToSend = template(replacements);
            const accessToken = await oAuth2Client.getAccessToken();
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'dm@dianam.art',
                    clientId: CLIENT_ID,
                    clientSecret: CLEINT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });
         
const options = {
  format: 'A4',
  
 
}

pdf.create(htmlToSend, options).toFile( __dirname +'/templates/certi.pdf', (err, res) => {
  if (err) {
    console.log(err);
  }
});

            const mailOptions = {
                from: 'dm@dianam.art',
                to: req.body.email,
                subject: 'The Product has been successfully purchased',
                // text: 'Something New',
                html: `<html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Diana</title>
                  <style>
                  
                  </style>
                </head>
              
                <body>
                  <p>Thank you for buying painting from Diana Art Gallery!</p>
              
                  <p style="margin: top 10px">
                    You can download the certificate of authenticity from the attachment
                  </p>
                  <p>
                    Name of Art : ${req.body.title}<br />
                    Year : ${req.body.year} <br /> Size : ${req.body.size}
                  </p>
                 
                </body>
              </html>`,
                // template: 'index'
                attachments: [
            //         {
            //         filename: 'sample.jpg',
            //         path: __dirname +'/templates/sample.jpg',
            //         cid: 'sample' 
            //    },
               {
                filename: 'certificate.pfd',
                path: __dirname +'/templates/certi.pdf',
                contentType: 'application/pdf'
               }]
            };
            const result = await transport.sendMail(mailOptions);
            if (result.accepted.length != 0) {
                res.status(200).json({
                    message: "Gmail Sent Successfully...!"
                })
            } else {
                res.status(400).json({
                    message: "This time We not able send Mail to User Please try Later...!"
                })
            }

        } catch (error) {
            res.status(400).json({
                message: "Something Went Wrong...!"
            })
        }
    } else {
        res.status(400).json({
            message: "Invalied Id Please Check...!"
        })
    }
}
exports.createUserEmail = async (req, res) => {
    const { email } = req.body
    const _userEmailModel = new userEmailModel({
        email
    });
    const CLIENT_ID = '394351948978-3ii40mtp82ipml822qa9k6gvjrd4voa8.apps.googleusercontent.com';
    const CLEINT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04TrzPYXrrpTXCgYIARAAGAQSNwF-L9IrEgCWxsB67CtguwzrwWr3SVLXxd2n0guT_sQ-tIRRIsQYmmDld2UgFyP9Rl2l0ZLAago';

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLEINT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        const filePath = path.join(__dirname, '/templates/subscribe.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            typeOfArt: req.body.typeOfArt,
            nameOfArt: req.body.nameOfArt
        };
        const htmlToSend = template(replacements);
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'dm@dianam.art',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'dm@dianam.art',
            to: email,
            subject: 'Greeting From Diana Art Gallery',
            // text: 'Something New',
            html: htmlToSend,
            // template: 'index'
        };
        const result = await transport.sendMail(mailOptions);
        if (result.accepted.length != 0) {
            const data = await _userEmailModel.save()
            if (data) {
                res.status(200).json({
                    message: "Gmail Sent Successfully...!"
                })
            } else {
                res.status(400).json({
                    message: "Something Went Wrong...!"
                })
            }

        } else {
            res.status(400).json({
                message: "This time We not able send Mail to User Please try Later...!"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Something Went Wrong...!"
        })
    }

}