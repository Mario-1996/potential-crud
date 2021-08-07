const request = require("supertest")

const app = require('../../app')
const { developer } = require('../../models')
const truncament = require("../../utils/trunc")

describe('Method GET /developers', () => {

    it('Deve retornar status 400 por não haver dev cadastrado', async () => {
        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 200 ao criar um dev', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .get("/developers")

            
        expect(response.status).toBe(200)
    })
})    

describe('Method GET/id /developers/{id}', () => {

    it('Deve retornar status 400 ao enviar um id inexistente', async () => {
        const response = await request(app)
            .get("/developers/15")

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 200 ao enviar um id existente', async () => {
        const dev = await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .get(`/developers/${dev.id}`)

        expect(response.status).toBe(200)
    })
})

describe('Method POST /developers', () => {

    it('Deve retornar status 400 ao enviar um dev para salvar com nome em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 400 ao enviar um dev para salvar com sexo em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 400 ao enviar um dev para salvar com a idade em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: '',
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 400 ao enviar um dev para salvar com data de nascimento em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 400 ao enviar um dev para salvar com hobby em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: ""
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 400 ao enviar um dev para salvar a data de nascimento incompatível com a idade.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1995-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 201 ao enviar um dev para salvar com todos os dados corretos.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(201)
    })
})

describe('Method PUT /developers/{id}', ()=> {

    it('Deve retornar status 400 ao enviar um update de dev com id inexistente', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento:"1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/8")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev com o nome em branco', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev com o sexo em branco.', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Mario Prohman",
                sexo: "",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev com a idade em branco.', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
            nome: "Mario Prohman",
            sexo: "M",
            idade: '',
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev com a data de nascimento em branco.', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev com o hobby em branco.', async () => {
        await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: ""
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 400 ao enviar um update de dev para atualizar data de nascimento incompativel.', async () => {
        await developer.create({
            nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "desenvolver app"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1995-07-19",
                hobby: "desenvolver app"
            })

        expect(response.status).toBe(400)
    })
    
    it('Deve retornar status 200 ao enviar um update de dev com dados corretos.', async () => {
        const dev = await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .put(`/developers/${dev.id}`)
            .send({
                nome: "Mario Prohman",
                sexo: "M",
                idade: 25,
                datanascimento: "1996-07-19",
                hobby: "Desenvolver apps"
            })

        expect(response.status).toBe(200)
    })
})

describe('Method DEL /developers/{id}', () => {
    beforeEach(async () => {
        await truncament()
    })

    it('Deve retornar status 400 ao enviar um id inexistente', async () => {
        const response = await request(app)
            .delete("/developers/8")

        expect(response.status).toBe(400)
    })

    it('Deve retornar status 204 ao enviar um id existente', async () => {
        const dev = await developer.create({
            nome: "Mario Prohman",
            sexo: "M",
            idade: 25,
            datanascimento: "1996-07-19",
            hobby: "Desenvolver apps"
        })

        const response = await request(app)
            .delete(`/developers/${dev.id}`)

        expect(response.status).toBe(204)
    })
})