import { GridColDef } from "@mui/x-data-grid";
// import DataTableAlquiler from "../../components/dataTableAlquiler/DataTableAlquiler";
import "./ejemplares_conservacion.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";
import Update from "../../components/update/updateEjemplar_Conservacion/Update";
import DataTableEjemplar_Conservacion from "../../components/dataTableEjemplar_conservacion/DataTableEjemplar_Conservacion";

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
    field: "conservacion",
    type: "string",
    headerName: "Conservación",
    width: 75,
  },
];

const Ejemplares_Conservacion = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Almacena el elemento seleccionado para actualizar

  const { isLoading, data } = useQuery({
    queryKey: ["allejemplares"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/ejemplar-conservacion").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };
  
  return (
    <div className="ejemplares">
      <div className="info">
        <h1>Ejemplares Conservación</h1>
        <button onClick={() => setOpenAddModal(true)}>Crear Ejemplar Conservación</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableEjemplar_Conservacion slug="ejemplar" columns={columns} rows={data} onEditClick={handleEditClick}/> // Pasa la función handleEditClick a DataTable
      )}

      {openAddModal && <Add slug="ejemplar" columns={columns} setOpen={setOpenAddModal} />}

      {isUpdateModalOpen && selectedItem && (
        <Update
          slug="ejemplar"
          columns={columns}
          setOpen={setUpdateModalOpen}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Ejemplares_Conservacion;