import { supabase } from "supabase/client";
import { useState, useEffect } from "react";
import Main from "components/main";
import { Table } from "react-bootstrap";

export default function YearTable() {
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    async function fetchYearData() {
      const { data: yearData, error } = await supabase.from("year").select("*");

      if (error) {
        console.log(error);
      } else {
        setYearData(yearData);
      }
    }

    fetchYearData();
  }, []);


  return (
    <Main>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {yearData.map((test) => (
            <tr key={test.id}>
              <td>{test.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Main>
  );
}
