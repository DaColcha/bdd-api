import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./socios.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "string",
    headerName: "Cédula",
    width: 100,
  },
  {
    field: "nombre",
    type: "string",
    headerName: "Socio",
    width: 150,
  },
  {
    field: "telf",
    type: "number",
    headerName: "Teléfono",
    width: 100,
  },
  {
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 100,
  },
  {
    field: "direccion",
    type: "string",
    headerName: "Dirección",
    width: 200,
  },
  {
    field: "garante",
    type: "string",
    headerName: "Garante",
    width: 100,
  }
];

const Socios = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allsocios"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/socio").then((res) => res.json()),
  });

  return (
    <div className="socios">
      <div className="info">
        <h1>Socios</h1>
        <button onClick={() => setOpen(true)}>Agregar Socio</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="socio" columns={columns} rows={data} />
      )}
      {open && <Add slug="socio" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Socios;