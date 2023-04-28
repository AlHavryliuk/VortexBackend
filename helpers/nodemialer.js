import nodemialer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const { META_PASS } = process.env;
const { BASE_URL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vortexgames@meta.ua",
    pass: META_PASS,
  },
};

const transport = nodemialer.createTransport(nodemailerConfig);

export const sendMessage = (to, subject, text) => {
  const email = {
    from: "vortexgames@meta.ua",
    to,
    subject,
    text,
  };
  transport
    .sendMail(email)
    .then(() => console.log("Success"))
    .catch((error) => console.log(error));
};

export const sendVerifyMessage = (to, verificationCode) => {
  const email = {
    from: "vortexgames@meta.ua",
    to,
    subject: "Verify email",
    text: `Thank you for registering on the site.`,
    html: `<p>To confirm the mailing address, follow the <a href="${BASE_URL}/api/auth/verify/${verificationCode}">link</a>.</p>`,
  };
  transport
    .sendMail(email)
    .then(() => console.log("Success"))
    .catch((error) => console.log(error));
};
