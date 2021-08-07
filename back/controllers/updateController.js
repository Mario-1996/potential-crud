const { developer } = require('../models')
const { validaNome, validaSexo, validaIdade, validaData, validaHobby } = require('../utils/validation');

class updateController {
    async update (req, res) {
        const { id } = req.params
        
        let { nome, sexo, idade, datanascimento, hobby } = req.body

        if(Object.keys(req.body ?? {}).length === 0 || req.body === undefined) {
            return res.status(400).json({ message: 'Não foi informado nenhum dado para alterar!'})
        }

        const dev = await developer.findOne({
            where: { id: id }
        })

        if(!dev || dev.length == 0) {
            return res.status(400).json({ message: 'Desenvolvedor não encontrado!'})
        }

        try { 
            nome = nome ? (() => {validaNome(nome); return nome})(): dev.nome;
            sexo = sexo ? (() => {validaSexo(sexo); return sexo})(): dev.sexo;
            idade = idade ? (() => {validaIdade(idade); return idade})(): dev.idade;
            datanascimento = datanascimento ? (() => {validaData(datanascimento, idade); return datanascimento})(): dev.datanascimento;
            hobby = hobby ? (() => {validaHobby(hobby); return hobby})(): dev.hobby;
           
            
            const dev = await developer.update({ nome, sexo, idade, datanascimento, hobby }, {
                where: { id: id } 
            })
            const response = {
                mensagem: 'Dev atualizado com sucesso',
                DevAtualizado: req.body,
                    request: {
                        tipo: 'GET',
                        descricao:'Mostra todos os Dev',
                        url: 'http://localhost:3000/developers'
                    }
                }
        
            return res.status(200).json( response )
        } catch (msg) {
            return res.status(400).json({ error: msg })
        }
    }

}
    module.exports = new updateController();