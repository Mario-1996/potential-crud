const { developer } = require('../models')

class destroyController {
    async destroy(req, res) {
        const { id } = req.params

        const dev = await developer.destroy({ 
            where: { id: id }
        });

        if(!dev || dev.length == 0) {
            return res.status(400).json({ message: 'Dev não encontrado!' })
        }

        const response = {
            mensagem: 'Dev removido com sucesso',
            request : {
                tipo: 'DEL',
                descricao: 'Deleta um dev',
                url: 'http://localhost:3000/developers/' + req.body.id
            }
        }

        return res.status(204).json( response )
    }
}
    module.exports = new destroyController();