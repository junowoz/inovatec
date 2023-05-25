import React from "react";
import User from "./user";
import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      // sticky="top"
      className="hover-custom shadow-sm w-100"
    >
      <Container>
        {/* Logo */}
        <Link href="/">
          <Image
            src="/LogoInovatec.svg"
            width="54"
            height="54"
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
            <Link href="/" className="me-4 text-secondary">
              Inicio
            </Link>
            <Link href="/projetos" className="me-4 text-secondary">
              Projetos
            </Link>
            <Link href="/inscrever" className="me-4 text-secondary">
              Inscrever
            </Link>
            {/* <Link href="/manual" className="text-secondary">
              Manual
            </Link> */}
            {/* <Link href="#features" disabled>
              Rank
            </Link> */}
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
