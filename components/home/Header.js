import React from "react";
import { userState } from "context/User/UserState";
import User from "./user";
import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";

export default function Header({}) {
  const user = userState((state) => state.user); // User state

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
      className="hover-custom shadow-sm w-100"
    >
      <Container>
        {/* Logo */}
        <Link href="/">
          <Image
            src="/inovatec.png"
            width="80"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
        {/* End Logo */}

        {/* NavBar Toggle */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto flex-fill"></Nav>

          <Nav className="me-auto flex-fill">
            <Nav.Link href="/projetos">Projetos</Nav.Link>
            <Nav.Link href="/registro">Registro</Nav.Link>

            <Nav.Link href="/manual">Manual</Nav.Link>

            <Nav.Link href="#features" disabled>
              Rank
            </Nav.Link>
          </Nav>

          <Nav>
            <User />
          </Nav>
        </Navbar.Collapse>
        {/* End NavBar Toggle */}
      </Container>
    </Navbar>
  );
}
