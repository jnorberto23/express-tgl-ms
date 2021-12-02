import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

class sendMail {
  private transporter: Transporter;
  private hbsConfig: any;

  constructor() {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ece18e4d1b1455", // your email address
        pass: "0f745c7daebcea", // your webmail password
      },
      secure: false,
      logger: true,
      debug: true,
    });

    const hbsConfig = {
      viewEngine: {
        extName: ".html",
        partialsDir: path.resolve("./src/resources/views/emails"),
        layoutsDir: path.resolve("./src/resources/views/emails"),
        defaultLayout: "",
      },
      viewPath: path.resolve("./src/resources/views/emails"),
      extName: ".html",
    };

    this.hbsConfig = hbsConfig;
    this.transporter = transport;
  }

  async send(params: any) {
    const { email, subject, message } = JSON.parse(params.message);
    const template = params.template;

    this.transporter.use("compile", hbs(this.hbsConfig));

    const mailer = {
      from: "contato@tgl.com",
      to: email.toString(),
      subject: subject.toString(),
      template: template.toString(),
      context: { message },
    };

    await this.transporter
      .sendMail(mailer)
      .then(() => {
        console.log(`Mensagem enviada para ${email}`);
      })
      .catch((error) => {
        console.log("Erro ao enviar a mensagem: ", error);
      });
  }
}

export default new sendMail();
