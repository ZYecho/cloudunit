/*
 Date: 22th June
 Author: IsmaStormZ
 */

const http = require('http');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/pages', express.static(__dirname));

//Home page

app.get('/', (req,res) => {
    res.sendFile('index.html');
    console.log('CloudUnit reading console log ...' + req.url);
});

// Create reusable transporter object using the default SMTP transport and sending mail function

app.post('/contact',  (req, res) => {
    // console.log(JSON.stringify(req.body));
    console.log(req.body);
    if(req.body.setName == "" || req.body.setEmail == "") {			//check that the requested fields are filled in.
        res.send("Error: Name & Email should not be blank");		//Message if issue in field
        return false;
    }

    //sending Email with SMTP, Configuring SMTP setting
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        host: "smtp.gmail.com", 	//hostname
        secureConnection: true,		//use SSL
        port: 465,					//port for secure SMTP
        auth: {
            user: 'onifuerte@gmail.com',
            pass: '1jack00@'
        }
    });

    // setup email data
    let mailOptions = {
        from: "cloudunit@treeptik.com", 	                        // sender address
        to: "Treeptik mail - <onifuerte@gmail.com>",				// list of receivers
        subject: 'Cloudunit new test.',
        html: "<b>" + "Name : " + req.body.setName + "<b>" + "<br>" + "Mail : " + req.body.setEmail		// name to form in index.html
    };

    // send mail with defined transport object

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send("Email could not send due to error : " + error);
        }
        else {
            res.send("Email has been sent successfuly : " + info);
        }
    });

    /* sendmail(mailOptions, (err, reply) => {
     console.log(err);
     }); */
});

//Starting server

const server = http.createServer(app).listen(port, () => {
    console.log("Server Running on 127.0.0.1 : " + port);
});