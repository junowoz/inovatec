import Image from "next/image";
import React from "react";
import ImagePrincipal from "./unsplash_MabODzq9TIc.png";

export default function ImagePrueba2() {
    return (
        <Image
            src={ImagePrincipal}
            alt="Projetos"
            className="ratio ratio-1x1 d-none d-xl-block rounded-5 my-3 mx-3 w-auto"
            style={{ maxHeight: "500px", maxWidth: "500px" }}
        />
    );
}
