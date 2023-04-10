import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container, SSRProvider } from 'react-bootstrap'
import Formnav2 from './Formnav2'
import Formfooter from './Formfooter'
import Formimg from './Formimg'
import { supabase } from 'supabase/client';
import Router from 'next/router'
export default function Register(props) {


    return(
    <>
        <Head>
            <link rel="shortcut icon" href="/mesa.png" />
            <title>Recycling</title>
        </Head>

        <SSRProvider>
            <div className='d-flex flex-row '>
                <Formimg />

                <div className='d-flex flex-column justify-content-between with-available' style={{
                    height: "100vh"
                }} >

                    <Formnav2 />


                    <Container className='d-flex flex-column justify-content-center align-content-center align-items-center' >
                        {props.children}
                    </Container>

                    <Formfooter />
                </div>

            </div>
        </SSRProvider>

    </>
    )
}
