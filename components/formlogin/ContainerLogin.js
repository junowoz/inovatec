import React, { useEffect } from "react";
import Head from "next/head";
import { Container, SSRProvider } from "react-bootstrap";
import LoginNav from "./LoginNav";
import LoginFooter from "./LoginFooter";
import { supabase } from "supabase/client";
import Router from "next/router";
export default function ContainerLogin(props) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/LogoInovatec.png" />
        <title>Inovatec | Login</title>
      </Head>

      <SSRProvider>
        <div className="d-flex flex-row ">
          <div
            className="d-flex flex-column justify-content-between with-available"
            style={{
              height: "100vh",
            }}
          >
              <LoginNav className='ml-auto' />

            <Container className="d-flex flex-column justify-content-center align-content-center align-items-center">
              {props.children}
            </Container>

            <LoginFooter />
          </div>
        </div>
      </SSRProvider>
    </>
  );
}
