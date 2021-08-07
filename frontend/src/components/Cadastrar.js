import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../services/api";

function Cadastrar() {
  const [values, setValues] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    if (id) {
      api.get(`/developers/${id}`).then(({ data }) => {
        const { response } = data
        setValues({
          nome: response.nome,
          idade: response.idade,
          sexo: response.sexo,
          datanascimento: response.datanascimento,
          hobby: response.hobby
        })
      })
    }
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.log(data)

    if (!id) {
      const response = await api.post(`/developers`, data);
      if (response.status !== 201) {
        window.alert("Erro ao Cadastrar o Desenvolvedor!");
        return
      }
      window.alert(response.data.mensagem);
    } else {
      const response = await api.put(`/developers/${id}`, data);
      if (response.status !== 200) {
        window.alert("Erro ao Cadastrar o Desenvolvedor!");
        return
      }
      window.alert(response.data.mensagem);
    }
    historyPush();
  };

  const historyPush = () => {
    history.push("/dashboard");
  };

  return (
    <Container>
      <h1 className="text-dark my-4">
        {id ? "Alterar" : "Cadastrar"}  Dev
      </h1>
      <Form onSubmit={handleSubmit} >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="nome"
              type="text"
              value={values.nome || ''}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              name="idade"
              type="number"
              min="0"
              value={values.idade || ''}
              onChange={handleInputChange}
              placeholder="Digite sua idade"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBirthDate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              name="datanascimento"
              value={values.datanascimento || ''}
              onChange={handleInputChange}
              type="date"
              placeholder="Digite sua data de nascimento"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRadio">
            <Form.Label>Sexo</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                inline
                name="sexo"
                label="Feminino"
                value="F"
                onChange={handleInputChange}
                checked={values.sexo === "F"}
              />
              <Form.Check
                type="radio"
                inline
                name="sexo"
                label="Masculino"
                value="M"
                onChange={handleInputChange}
                checked={values.sexo === "M"}
              />
            </Col>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridHobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control
            as="textarea"
            name="hobby"
            required
            value={values.hobby || ''}
            onChange={handleInputChange}
            placeholder="Descreva seu Hobby..."
          />
        </Form.Group>

        <Col className="d-flex justify-content-end ">
          <Button
            variant="outline-danger"
            type="button"
            className="me-3"
            onClick={() => historyPush()}
          >
            Cancelar
          </Button>
          <Button variant="outline-success" type="submit">
            Enviar
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Cadastrar;
