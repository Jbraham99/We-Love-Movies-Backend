const service = require("./movies.service")

async function list(req, res) {
    const response = await service.list()
    res.json({data: response})
}

module.exports = {
    list
}