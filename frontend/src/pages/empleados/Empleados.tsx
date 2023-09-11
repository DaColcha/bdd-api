import { GridColDef } from "@mui/x-data-grid";
//import DataTable from "../../components/dataTable/DataTable";
import "./empleados.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";

import DataTableEmpleado from "../../components/dataTableEmpleado/DataTableEmpleado";
import Update from "../../components/update/updateAlquiler/Update";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "number",
    headerName: "Cod. Empleado",
    width: 125,
  },
  {
    field: "nombre",
    type: "string",
    headerName: "Nombre",
    width: 100,
  },
  {
    field: "salario",
    type: "number", 
    headerName: "Salario",
    width: 150,
  },
  {
    field: "cargo",
    type: "string",
    headerName: "Cargo Empleado",
    width: 150,
  },
  {
    field: "cod_agencia",
    type: "number",
    headerName: "Cod. Agencia",
    width: 100,
  },
  {
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 150,
  },
];

const Empleados = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Almacena el elemento seleccionado para actualizar

  const { isLoading, data } = useQuery({
    queryKey: ["allalquileres"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/empleado").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };
  
  return (
    <div className="empleados">
      <div className="info">
        <h1>Empleados</h1>
        <button onClick={() => setOpenAddModal(true)}>Empleado Agencia</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableEmpleado slug="alquiler" columns={columns} rows={data} onEditClick={handleEditClick}/> // Pasa la función handleEditClick a DataTable
      )}

      {openAddModal && <Add slug="alquiler" columns={columns} setOpen={setOpenAddModal} />}

      {isUpdateModalOpen && selectedItem && (
        <Update
          slug="alquiler"
          columns={columns}
          setOpen={setUpdateModalOpen}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Empleados;