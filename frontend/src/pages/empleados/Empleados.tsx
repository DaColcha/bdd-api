import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Empleados.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "phone",
    type: "string",
    headerName: "ID",
    width: 200,
  },
  {
    field: "firstName",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Dirección",
    width: 150,
  },
];

const Empleados = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:8800/glob-guster/empleado").then((res) => res.json()),
  });

  return (
    <div className="empleados">
      <div className="info">
        <h1>Empleados</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* <DataTable slug="empleados" columns={columns} rows={userRows} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="empleados" columns={columns} rows={data} />
      )}
      {open && <Add slug="empleado" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Empleados;