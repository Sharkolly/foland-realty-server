import db from "../../../helpers/db.js";

export const createUser = async (email, uuid, password) => {
  const user = await db.admin.create({
    data: {
      email: email.toLowerCase(),
      uuid,
      password,
    },
  });

  return user;
};
export const checkUser = async (email) => {
  const user = await db.admin.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  return user;
};
