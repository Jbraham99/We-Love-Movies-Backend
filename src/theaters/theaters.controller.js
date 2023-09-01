const service = require("./theatrers.service");


async function list(req, res) {
  // const movieId = req.params;
  // const movieIdNum = Number(movieId)
  // console.log("**", movieId)
  const response = await service.list()
  res.json({data: response})
}

module.exports = {
    list
}