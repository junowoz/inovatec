import React from "react";
import ImageUploading from "react-images-uploading";
import { Button, Col, Image, Row } from "react-bootstrap";
import { HiPlus } from "react-icons/hi";

export default function InputFile2({
  InitialValues = [],
  maxNumber = 30,
  ...props
}) {

  const [images, setImages] = React.useState(InitialValues);

  
  const HandleChange = async (imageList, addUpdateIndex) => {

    setImages(imageList); 

    const data = imageList.map((datum) => {
      const {file, data_url} = datum;
      return file
    });
    let event = {}
    if(data.length > 0){
      event = {
      target: { value: [...data], name: props.name, id: props.id, files: [...data] },
    };}else{
      event = {
        target: { value: undefined, name: props.name, id: props.id, files: undefined },

    }}

    props.onChange(event);
  };

  return (
    <ImageUploading
      name={props.name}
      multiple
      value={images}
      onChange={HandleChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      onBlur={props.onBlur}
      className={props.className}
      style={props.style}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="">
          <div className="d-flex align-items-end justify-content-between">

            <div className="d-flex align-items-center mb-3">
              Fotos del producto{" "}
              <div className="mx-1" style={{ color: "red" }}>
                *
              </div>
            </div>

            <Button className="mb-2" onClick={onImageRemoveAll}>
              Quitar todas las imágenes
            </Button>
          </div>

          <div
            className="upload__image-wrapper mb-4 "
            style={{
              backgroundColor: "#F8F9FA",
              border: "1px dashed #ADB5BD",
              borderRadius: "10px",
            }}
          >
            <Row
              style={{ minHeight: "150px" }}
              className=" justify-content-center"
            >
              {imageList.length > 0 ? (
                <Row className=" justify-content-center  justify-content-sm-start">
                  <Col
                    lg={4}
                    xs={6}
                    className="image-item d-flex align-items-center my-2 flex-column justify-content-center"
                    onClick={onImageUpload}
                    {...dragProps}
                    style={{ height: "200px", width: "200px" }}
                  >
                    <div
                      className="image-item d-flex align-items-center  my-4  flex-column justify-content-center"
                      style={{
                        border: "1px dashed #ADB5BD",
                        borderRadius: "10px",
                        height: "160px",
                        width: "160px",
                        color: isDragging ? "red" : "gray",
                      }}
                    >
                      <HiPlus />
                      <center>Subir o arrastrar fotos</center>
                    </div>
                  </Col>

                  {imageList.map((image, index) => (
                    <Col
                      lg={4}
                      xs={6}
                      key={index}
                      className=" d-flex align-items-center mb-3 flex-column justify-content-end ImageUpload"
                      style={{ height: "200px", width: "200px" }}
                    >
                      <Image
                        src={image["data_url"]}
                        alt=""
                        width="100"
                        height="100"
                        className=""
                        onClick={() => onImageRemove(index)}
                      />
                      <div className="image-item__btn-wrapper">
                        <Button
                          className="m-1"
                          onClick={() => onImageUpdate(index)}
                        >
                          Actualizar
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Col
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{
                    height: "150px",
                    width: "100%",
                    color: isDragging ? "red" : "gray",
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <HiPlus />
                  Subir o arrastrar fotos
                </Col>
              )}
            </Row>
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
