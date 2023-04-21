import Link from 'next/link'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

export default function ButtonWhatsapp() {
  return (
          
          <Link
          href="https://wa.me/50769240795?text=%C2%A1Hola!"
          className="float d-grid"
          style={{
            position: "fixed",
            width: "60px",
            height: "60px",
            bottom: "40px",
            right: "40px",
            backgroundColor: "#0FA899",
            color: "#FFF",
            borderRadius: "50px",
            textAlign: "center",
            fontSize: "30px",
            boxShadow: "2px 2px 3px #999",
            zIndex: "100",
            placeContent: "center",
            justifyContent: "center",
          }}
          target="_blank"
        >
            <BsWhatsapp size={40} />
          
        </Link>
  )
}
