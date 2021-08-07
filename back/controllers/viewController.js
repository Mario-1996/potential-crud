const { developer } = require('../models')

class viewController {
    async view(req, res) {
        const limit = 10
        const data = req.query
        let page = data.page - 1 || 0

        const response = await developer.findAndCountAll({  limit: limit, offset: page * limit }) 

        if(!response.rows || response.rows.length === 0) {
            return res.status(400).json({ message: 'Dev não encontrado!' })
        }
        
        return res.status(200).json({ response, page, limit });
    }

    async show(req, res) {
        const { id } = req.params

        const response = await developer.findOne({ 
            where: {  id: id }
        }) 

        if(!response || response.length == 0) {
            return res.status(400).json({ message: 'Dev não encontrado!' })
        }

        return res.status(200).json({ response })
    }

}
    module.exports = new viewController();