import { GridColDef } from "@mui/x-data-grid";
import DataTableEjemplar_Info from "../../components/dataTableEjemplar_info/DataTableEjemplar_Info";
import "./ejemplares_info.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
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
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
];

const fullColumns: GridColDef[] = [
  {
    field: "id",
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
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
  {
    field: "conservacion",
    type: "string",
    headerName: "Conservación",
    width: 150,
  },
];

const Ejemplares_Info = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  
  const { isLoading, data } = useQuery({
    queryKey: ["allejemplares"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/ejemplar-info").then((res) => res.json()),
  });

  return (
    <div className="ejemplares">
      <div className="info">
        <h1>Info Ejemplares</h1>
        <button onClick={() => setOpenAddModal(true)}>Nuevo Ejemplar</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableEjemplar_Info slug="ejemplar" columns={columns} rows={data}/>
      )}
      
      {openAddModal && <Add slug="ejemplar-info" columns={fullColumns} setOpen={setOpenAddModal} />}
      
    </div>
  );
};

export default Ejemplares_Info;