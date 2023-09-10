import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./socios.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import Update from "../../components/update/Update";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "string",
    headerName: "Cédula",
    width: 100,
  },
  {
    field: "nombre",
    type: "string",
    headerName: "Socio",
    width: 150,
  },
  {
    field: "telf",
    type: "number",
    headerName: "Teléfono",
    width: 100,
  },
  {
    field: "ciudad",
    type: "string",
    headerName: "Ciudad",
    width: 100,
  },
  {
    field: "direccion",
    type: "string",
    headerName: "Dirección",
    width: 200,
  },
  {
    field: "garante",
    type: "string",
    headerName: "Garante",
    width: 100,
  }
];

const Socios = () => {

  const [openAddModal, setOpenAddModal] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); 

  const { isLoading, data } = useQuery({
    queryKey: ["allsocios"],
    queryFn: () =>
      fetch("http://localhost:4000/glob-guster/socio").then((res) => res.json()),
  });

  const handleEditClick = (item: any) => {
    // Abre el modal de actualización y pasa el elemento seleccionado
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  return (
    <div className="socios">
      <div className="info">
        <h1>Socios</h1>
        <button onClick={() => setOpenAddModal(true)}> Agregar Socio </button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="socio" columns={columns} rows={data} onEditClick={handleEditClick}/>
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

export default Socios;