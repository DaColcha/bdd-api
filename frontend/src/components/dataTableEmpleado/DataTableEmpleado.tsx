import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTableEmpleado.scss";
//import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import ModifyAlquiler from "../modify/ModifyAlquiler";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onEditClick: (item: any) => void;
};

const DataTableEmpleado = (props: Props) => {


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      const [cod_empleado, cod_agencia, ciudad] = id.split("-");
      return fetch(`http://localhost:4000/glob-guster/${props.slug}/${cod_empleado}/${cod_agencia}/${ciudad}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = (cod_empleado: number, cod_agencia: number, ciudad: string) => {
    //delete the item
    let ID: string;
    ID = `${cod_empleado}-${cod_agencia}-${ciudad}`;
    mutation.mutate(ID);
    window.location.reload();
  };

  const actionColumn: GridColDef = {
    field: "actionD",
    headerName: "Delete",
    width: 75,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => handleDelete(params.row.cod_empleado, params.row.cod_agencia,params.row.ciudad)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

   return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[
          ...props.columns,
          {
            field: "action",
            headerName: "Update",
            width: 75,
            renderCell: (params) => (
              <div className="action">
                <div className='modify' onClick={() => props.onEditClick(params.row)}>
                  <img src="/view.svg" alt="" />
                </div>
              </div>

            ),
          }, actionColumn
        ]}
      />
    </div>
  );
};

export default DataTableEmpleado;
