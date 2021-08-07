import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import api from '../services/api';

const Listagem = () => {
  const [listDev, setListDev] = useState([]);
  const [query, setQuery] = useState("");

  const findDeveloper = async () => {
    const response = await api.get('/developers');

    setListDev(response.data.response.rows)
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value.toUpperCase());
  };

  const destroyDeveloper = async (id) => {
    const response = await api.delete(`/developers/${id}`);

    if (response.status === 204) {
      window.alert("Removido com Sucesso !");
      findDeveloper(query)
    }
  }

  useEffect(() => {
    findDeveloper(query)
  }, [query])

  const formateDate = (data) => new Date(data).toLocaleDateString();

  return (
    <Container>
      <Form>
        <Row>
          <Form.Group as={Col}>
            <h1 className="text-dark my-4">Listagem </h1>{" "}
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-2 pt-4 pb-3 d-flex"
            controlId="formBasicCheckbox"
          >
            <Form.Control
              name="buscar"
              type="text"
              label="Buscar"
              placeholder="Buscar"
              value={query}
              onChange={handleInputChange}
            />
            <Button variant="light" className="ms-3" type="submit">
              <BiSearchAlt2 />
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listDev.length > 0 &&
            listDev.map((dev) => {
              return (
                <tr key={dev.id}>
                  <td>{dev.nome}</td>
                  <td>{dev.sexo}</td>
                  <td>{dev.idade}</td>
                  <td>{dev.hobby}</td>
                  <td>{formateDate(dev.datanascimento)}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/cadastrar/${dev.id}`}
                      style={{ textDecoration: "none", color: "#08f" }}
                    >
                      <Button
                        variant="success"
                        size="sm"
                        type="button">
                        <BsPencilSquare />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`Deseja Deletar o Desenvolvedor ${dev.nome} ?`)) {
                          destroyDeveloper(dev.id)
                        }
                      }}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Listagem;