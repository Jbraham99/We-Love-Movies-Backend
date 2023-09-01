const service = require("./critics.service");

async function list(req, res) {
    const response = await service.list()
    res.json({data: response})
}

module.exports = {
    list
}