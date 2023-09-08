import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./alquileres.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "number",
    headerName: "Cod. Alquiler",
    width: 75,
  },
  {
    field: "cod_emp",
    type: "number",
    headerName: "Empleado",
    width: 75,
  },
  {
    field: "cod_agencia",
    type: "number",
    headerName: "Agencia",
    width: 75,
  },
  {
    field: "cc_socio",
    type: "string",
    headerName: "Socio",
    width: 150,
  },
  {
    field: "num_ejemplar",
    type: "number",
    headerName: "Ejemplar",
    width: 75,
  },
  {
    field: "cod_pelicula",
    type: "string",
    headerName: "Película",
    width: 150,
  },
  {
    field: "fecha_inicio",
    type: "string",
    headerName: "Fecha Inicio",
    width: 150,
  },
  {
    field: "fecha_entrega",
    type: "string",
    headerName: "Fecha Entrega",
    width: 150,
  },
  {
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
];

const Alquileres = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allalquileres"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/alquiler").then((res) => res.json()),
  });

  return (
    <div className="alquileres">
      <div className="info">
        <h1>Alquileres</h1>
        <button onClick={() => setOpen(true)}>Alquilar pelicula</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="alquiler" columns={columns} rows={data} />
      )}
      {open && <Add slug="alquiler" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Alquileres;