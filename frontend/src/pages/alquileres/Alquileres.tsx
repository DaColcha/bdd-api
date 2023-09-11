import { GridColDef } from "@mui/x-data-grid";
// import DataTableAlquiler from "../../components/dataTableAlquiler/DataTableAlquiler";
import "./alquileres.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";
import Update from "../../components/update/updateTwo/Update";
import DataTableTwo from "../../components/dataTableTwo/DataTableTwo";

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
    width: 100,
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
    width: 100,
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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Almacena el elemento seleccionado para actualizar

  const { isLoading, data } = useQuery({
    queryKey: ["allalquileres"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/alquiler").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };
  
  return (
    <div className="alquileres">
      <div className="info">
        <h1>Alquileres</h1>
        <button onClick={() => setOpenAddModal(true)}>Alquilar película</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableTwo slug="alquiler" columns={columns} rows={data} onEditClick={handleEditClick}/> // Pasa la función handleEditClick a DataTable
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

export default Alquileres;