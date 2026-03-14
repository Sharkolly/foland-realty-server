import { getProperties } from "../mongodb/controller/property.model.js";

const getPropertiesController = async (req, res, next) => {
  try {

    // get all properties
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const { property, hasMore } = await getProperties(page, limit);

    return res.status(200).json({
      success: true,
      hasMore,
      data: property,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export default getPropertiesController;
