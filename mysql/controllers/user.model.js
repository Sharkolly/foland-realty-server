import db from "../../helpers/db.js";

export const createUser = async (email, mongoDbID) => {
  const user = await db.user.create({
    data: {
      email,
      mongoDbID,
    },
  });

  return user;
};
export const checkUser = async (email, mongoDbID) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
