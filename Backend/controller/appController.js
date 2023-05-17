const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env')

/** send mail from testing account */
const signup = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
const getbill = (req, res) => {

    const { userEmail , name } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Subhaprakash from JobCheck",
            link : 'https://subhaprakashnayak-portfolio.netlify.app/'
        }
    })

    let response = {
        body: {
            name : name,
            intro: "job Appiled Succesfully!",
            table : {
                data : [
                    {
                        Designation : "Angular Developer",
                        description: "A Backend application",
                        Expected_Salary : "$1000.99",
                    }
                ]
            },
            outro: "Looking forward to do more Sucessfull"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Job Applied Successfully in jobCheck",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}