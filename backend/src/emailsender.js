import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "megabank2027@gmail.com",
    pass: ""
  }
});