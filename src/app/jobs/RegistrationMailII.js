import Mail from "../lib/Mail";

export default {
  key: "RegistrationMailII",
  async handle({ data }) {
    const {
      user: { name, email },
    } = data;
    await Mail.sendMail({
      from: "Queue Test <queeu@queeutest.com.br",
      to: `${name} ${email}`,
      subject: "Cadastro de usuários",
      html: `Olá, ${name}, bem-vindo ao sistema de filas do Ramon.`,
    });
  },
};
