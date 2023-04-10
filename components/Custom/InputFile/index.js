import { useRef } from "react";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";


import style from "./else.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function InputFile({ onChange, label, ...props }) {
  const [images, setImages] = useState([]);

  const Button = useRef(null);

  const preview = () => {
    return images.map((image, index) => {
      if (image !== "error") {
        if (image.type.includes("video")) {
          return (
            <Col key={index} lg={4} xs={6} className="mb-3 d-flex justify-content-center">
              <video width={150} height={150} src={URL.createObjectURL(image)} alt="video" />
            </Col>
          );
        }
        return (
          <Col key={index} lg={4} xs={6} className="mb-3">
            <Image src={URL.createObjectURL(image)} alt="something" />
          </Col>
        );
      }
      return (
        <Col xs={1} key={index}>
          <p className={style.error}>Error</p>
        </Col>
      );
    });
  };

  const handleChange = (e) => {
    // Si usas typescript pues verás un error acá, sinceramente, no tuve tiempo para ver cómo quitarlo, pero todo funciona
    const files = Object.values(e.target.files);

    // Comparar si es que el archivo es una imagen soportada o no
    // también podrías cambiar una variable o poner que se retorne algo al padre o al form para que puedas usar este dato
    let paths = files.map((file) => {
      if (
        file?.type.includes("png") ||
        file?.type.includes("webp") ||
        file?.type.includes("jpeg") ||
        file?.type.includes("mp4")
      ) {
        return file;
      }
      return "error";
    });

    setImages(paths);
    onChange(e);
  };

  const HandleClick = () => {
    Button.current?.click();
  };

  return (
    <div className={props.className}>
      <div className={style.else}>
        <label onClick={HandleClick}>
          {images.length !== 0 ? (
            <Row className="p-3">{preview()}</Row>
          ) : (
            <>
              <HiPlus />
              {label}
            </>
          )}
        </label>
        <input
          type="file"
          {...props}
          ref={Button}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </div>
    </div>
  );
}

InputFile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

InputFile.defaultProps = {
  onChange: () => {},
  label: "Subir o arrastrar fotos",
};
