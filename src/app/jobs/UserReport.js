import Mail from "../lib/Mail";

export default {
  key: "UserReport",
  options: {
    delay: 10000,
  },
  async handle({ data }) {
    const { user } = data;
    console.log(user);
  },
};
