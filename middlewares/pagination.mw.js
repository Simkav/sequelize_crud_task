const { MAX_LIMIT } = require('../constants/pagination');
const calculateOffset = (limit, page) => {
  if (Number.isInteger(page)) {
    page = page < 1 ? 0 : page;
    return limit * page - limit < 0 ? 0 : limit * page - limit;
  }
  return 0;
};
module.exports.checkPagination = async (req, res, next) => {
  try {
    const {
      query: { limit: reqLimit, page: reqPage },
    } = req;
    if (reqLimit || reqPage) {
      const limit = reqLimit > 0 && reqLimit < MAX_LIMIT ? reqLimit : MAX_LIMIT;
      const offset = calculateOffset(limit, Number(reqPage));
      req.pagiLimit = Number(limit);
      req.pagiOffset = offset;
      next();
    } else {
      req.withoutPagi = true;
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
