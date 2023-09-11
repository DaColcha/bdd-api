import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./reseñas.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";
import Update from "../../components/update/updateAlquiler/Update";
import DataTableAlquiler from "../../components/dataTableAlquiler/DataTableAlquiler";

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
    width: 275
  },
  {
    field: "calificacion",
    type: "number",
    headerName: "Calificacion",
    width: 100,
  },
  {
    field: "fecha",
    type: "string",
    headerName: "Fecha",
    width: 125,
  },
];


const Reseñas = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { isLoading, data } = useQuery({
    queryKey: ["allresenias"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/resenia").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  return (
    <div className="reseñas">
      <div className="info">
        <h1>Reseñas</h1>
        <button onClick={() => setOpenAddModal(true)}>Agregar reseña</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableAlquiler slug="resenia" columns={columns} rows={data}  onEditClick={handleEditClick}/>
      )}
      {openAddModal && <Add slug="resenia" columns={columns} setOpen={setOpenAddModal} />}
        
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

export default Reseñas;