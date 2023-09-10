import { GridColDef } from "@mui/x-data-grid";
// import DataTableAlquiler from "../../components/dataTableAlquiler/DataTableAlquiler";
import "./peliculas.scss";
import { useState } from "react";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";
import Update from "../../components/update/Update";
import DataTableAlquiler from "../../components/dataTablePelicula/DataTablePelicula";

const columns: GridColDef[] = [
  {
    field: "cod_pelicula",
    type: "number",
    headerName: "Cod. Pelicula",
    width: 75,
  },
  {
    field: "titulo",
    type: "string",
    headerName: "Título",
    width: 150,
  },
  {
    field: "cod_dir",
    type: "number",
    headerName: "Cod. Director",
    width: 150,
  },
  {
    field: "nacionalidad",
    type: "string",
    headerName: "Nacionalidad",
    width: 150,
  },
  {
    field: "productora",
    type: "string",
    headerName: "Productora",
    width: 150,
  },
  {
    field: "fecha_estreno",
    type: "string",
    headerName: "Fecha Estreno",
    width: 150,
  },
];

const Peliculas = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Almacena el elemento seleccionado para actualizar

  const { isLoading, data } = useQuery({
    queryKey: ["allpeliculas"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/pelicula").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };
  
  return (
    <div className="peliculas">
      <div className="peliculas__header">
        <h1>Peliculas</h1>
        <button onClick={() => setOpenAddModal(true)}>Agregar</button>
      </div>
      <div className="peliculas__table">
        <DataTablePelicula
          columns={[...columns, { ...actionColumn, renderCell: (params) => {
            return (
              <div className="action">
                <div className="delete" onClick={() => handleEditClick(params.row)}>
                  <img src="/delete.svg" alt="" />
                </div>
              </div>
            );
          }}]}
          rows={data}
          slug="pelicula"
        />
      </div>
      <Add
        open={openAddModal}
        setOpen={setOpenAddModal}
        slug="pelicula"
      />
      <Update
        open={isUpdateModalOpen}
        setOpen={setUpdateModalOpen}
        slug="pelicula"
        item={selectedItem}
      />
    </div>
  );
};

export default Peliculas;