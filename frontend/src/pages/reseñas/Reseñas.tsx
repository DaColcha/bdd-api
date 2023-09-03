import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./reseñas.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "number",
    headerName: "Num. Reseña",
    width: 100,
  },
  {
    field: "cod_pelicula",
    type: "string",
    headerName: "Pelicula",
    width: 150,
  },
  {
    field: "cc_socio",
    type: "string",
    headerName: "Socio",
    width: 150,
  },
  {
    field: "descripcion",
    type: "string",
    headerName: "Descripcion",
    width: 150,
  },
  {
    field: "calificacion",
    type: "number",
    headerName: "Calificacion",
    width: 150,
  },
  {
    field: "fecha",
    type: "string",
    headerName: "Fecha",
    width: 150,
  },
];

const Reseñas = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allresenias"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/resenia").then((res) => res.json()),
  });

  return (
    <div className="reseñas">
      <div className="info">
        <h1>Reseñas</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="resenia" columns={columns} rows={data} />
      )}
      {open && <Add slug="resenia" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Reseñas;