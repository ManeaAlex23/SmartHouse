




const sgMail =require("@sendgrid/mail");
sgMail.setApiKey("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");

    const msg ={
        to: "manea.alexandru1996@gmail.com",
        from:"manea.alexandru1996@gmail.com",
        subject:"Email from SmartHouse",
        text:"Avertizare",
        html:"<strong>Usor</strong>",
    };

    sgMail.send(msg);