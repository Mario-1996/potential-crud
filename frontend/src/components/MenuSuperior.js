import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { DiReact, DiNodejsSmall } from "react-icons/di";
import { Link } from "react-router-dom";

function MenuSuperior() {
  return (
    <Navbar bg="info" variant="dark">
      <Container>
        <Navbar.Brand className="sm" style={{ fontSize: '30px'}}>
        <DiNodejsSmall size="45px" title='Node.js'/>
          <DiReact size="45px" title='react'/>
          Developers
        </Navbar.Brand>
        <Nav className="me-right">
          <Nav.Link>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "#fff"}}>
              Listar
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/cadastrar"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Cadastrar
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MenuSuperior;
