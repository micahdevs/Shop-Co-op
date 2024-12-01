import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: "maddison53@ethereal.email",
		pass: "jn7jnAPss4f63QBp6D",
	},
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
		to: to, // list of receivers
		subject: "Change password", // Subject line
        html,
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	console.log("preview URL: %s", nodemailer.getTestMessageUrl(info));
}
