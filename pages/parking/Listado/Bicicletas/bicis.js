import { Card, Badge, Spinner, Col } from "react-bootstrap";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { parkingState } from "context/Parking/ParkingState";
import Relleno from "utils/relleno";
import { filtersState } from "context/Filters/filtersState";

export default function GetBicis(props) {
  const CDN = "https://yrdmpvdxobghopvoevsg.supabase.co/storage/v1/object/public/imagesbicis/"/* parkingState((state) => state.CDN2); */
  const setParking = parkingState((state) => state.setParking);
  const parking = parkingState((state) => state.parking);
  const filters = filtersState((state) => state.filters);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["productos"],
    queryFn: setParking,
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90hv",
          textAlign: "center",
        }}
      >
        <Spinner
          animation="border"
          variant="secondary"
          style={{
            width: "200px",
            height: "200px",
            fontSize: "90px",
          }}
        />
      </div>
    );
  }
  // Resto del código para renderizar los resultados filtrados

  return (
    <div
      className="d-grid gap-3 my-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit,minmax(14.8rem, 1fr)",
      }}
    >
      {/*
          - Antes era "data"
          - Se cambió para checkear que la estructura de "data" es un array, antes de usar el método "map"
          - Resuelve un error
          */}

      {Array.isArray(data)
        ? filteredData(data, filters).map((bici) => (
            <Card className="p-0" key={bici.id}>
              <Link href={`/parking/${bici.id}`} passHref>
                <div className="m-3">
                  <Badge bg="primary" style={{ color: "white" }}>
                    Popular
                  </Badge>
                  <Card.Img
                    variant="top"
                    src={CDN + bici.filesUrl[0]}
                    style={{
                      maxHeight: "200px",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    style={{
                      color: "rgba(108, 117, 125, 1)",
                    }}
                  >
                    {bici.models.name}
                  </Card.Text>
                  <Card.Title style={{ color: "black" }}>
                    {bici.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "rgba(108, 117, 125, 1)",
                    }}
                  >
                    ${bici.price.toLocaleString("en")}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))
        : ""}
      <Relleno />
    </div>
  );
}

function filteredData(data, filters) {
  return data.filter((datum) => {
    let passesFilter = true;

    if (filters.country?.length > 0 && !filters.country.includes(datum.country)) {
      passesFilter = false;
    }

    if (filters.category?.length > 0 && !filters.category.includes(datum.propiedades.category)) {
      passesFilter = false;
    }

    if (filters.subcategory?.length > 0 && !filters.subcategory.includes(datum.propiedades.subcategory)) {
      passesFilter = false;
    }

    if (filters.size?.length > 0 && !filters.size.includes(datum.size)) {
      passesFilter = false;
    }

    if (filters.brands?.length > 0 && !filters.brands.includes(datum.propiedades.brand)) {
      passesFilter = false;
    }

    if (filters.materials?.length > 0 && !filters.materials.includes(datum.propiedades.material)) {
      passesFilter = false;
    }

    if (filters.suspension?.length > 0 && !filters.suspension.includes(datum.propiedades.suspension)) {
      passesFilter = false;
    }

    if (filters.frenos?.length > 0 && !filters.frenos.includes(datum.propiedades.freno)) {
      passesFilter = false;
    }

    if (filters?.rines?.length > 0 && !filters.rines.includes(datum.propiedades.rine)) {
      passesFilter = false;
    }

    if (filters?.years?.length > 0 && !filters.years.includes(datum.year)) {
      passesFilter = false;
    }

    if (filters?.minPrice !== null && datum.price < filters.minPrice) {
      passesFilter = false;
    }

    if (filters?.maxPrice !== null && datum.price > filters.maxPrice) {
      passesFilter = false;
    }

    return passesFilter;
  });
}