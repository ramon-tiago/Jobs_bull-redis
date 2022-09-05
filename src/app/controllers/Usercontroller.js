import Queue from "../lib/Queue";
export const Usercontroller = {
  async store(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    // add job registrarionMail na fila
    await Queue.add("RegistrationMail", { user });
    await Queue.add("UserReport", { user });

    return res.json(user);
  },
};
