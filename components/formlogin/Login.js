import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container, SSRProvider } from 'react-bootstrap'
import Formnav from './Formnav'
import Formfooter from './Formfooter'
import Formimg from './Formimg'
import Router from 'next/router'
import { supabase } from 'supabase/client';

export default function Login(props) {
   
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/mesa.png" />
                <title>Recycling</title>
            </Head>

            <SSRProvider>
            <div className='d-flex flex-row'>
                <Formimg />
                <div className='d-flex flex-column justify-content-between' style={{
                    width: "-moz-available fill-available",
                    width: "fill-available",
                    width: "-webkit-fill-available",
                    height: "100vh"
                }} >
                        
                <Formnav />

                <Container className='d-flex flex-column  justify-content-center align-content-center align-items-center'>
                {props.children}
                </Container>

                <Formfooter />
                </div>

            </div>
            </SSRProvider>

        </>
    )
}
