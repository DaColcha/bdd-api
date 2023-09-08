import { GridColDef } from "@mui/x-data-grid";
import DataTableEjemplar from "../../components/dataTableEjemplar/DataTableEjemplar";
import "./ejemplares.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "num_ejemplar",
    type: "number",
    headerName: "Num. Ejemplar",
    width: 75,
  },
  {
    field: "cod_pelicula",
    type: "string",
    headerName: "Película",
    width: 75,
  },
  {
    field: "cod_agencia",
    type: "number",
    headerName: "Agencia",
    width: 75,
  },
  {
    field: "conservacion",
    type: "string",
    headerName: "Conservacion",
    width: 75,
  },
  {
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
];

const Ejemplares = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allejemplares"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/ejemplar").then((res) => res.json()),
  });

  return (
    <div className="ejemplares">
      <div className="info">
        <h1>Ejemplares</h1>
        <button onClick={() => setOpen(true)}>Ejemplares de Peliculas</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableEjemplar slug="ejemplar" columns={columns} rows={data} />
      )}
      {open && <Add slug="ejemplar" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Ejemplares;