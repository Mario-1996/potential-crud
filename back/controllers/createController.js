const { developer } = require('../models')
const { validaNome, validaSexo, validaIdade, validaData, validaHobby } = require('../utils/validation');

class createController {
    async create(req, res) {
        let { nome, sexo, idade, datanascimento, hobby } = req.body
      
        try {
            validaNome(nome, 'Nome inválido')
            validaSexo(sexo, 'Selecione o sexo!')
            validaIdade(idade, 'Idade inválida!')
            validaData(datanascimento, idade, 'Data de nascimento inválida')
            validaHobby(hobby, "Informe um hobby!")
            
            sexo = sexo.substr(0, 1);
            
            const dev = await developer.create({ nome, sexo, idade, datanascimento, hobby });

            const response = {
                mensagem: 'Dev inserido com sucesso',
                DevCriado: req.body,
                    request: {
                        tipo: 'GET',
                        descricao:'Mostra todos os Dev',
                        url: 'http://localhost:3000/developers'
                    }
                }
            
            return res.status(201).send( response )
        } catch (msg) {
            return res.status(400).json({ error: msg })
        }
    }

}
    module.exports = new createController();