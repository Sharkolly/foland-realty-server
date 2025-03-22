import db from "../../helpers/db.js";

export const createUser = async (email, uuid, role) => {
  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      uuid,
      role,
    },
  });

  return user;
};
export const checkUser = async (email) => {
  const user = await db.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  return user;
};
