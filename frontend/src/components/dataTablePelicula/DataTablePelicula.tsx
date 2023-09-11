import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTablePelicula.scss";
//import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import ModifyAlquiler from "../modify/ModifyPelicula";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onEditClick: (item: any) => void;
};

const DataTablePelicula = (props: Props) => {


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:4000/glob-guster/${props.slug}/${id}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = (id: string) => {
    //delete the item
    let ID: string;
    ID = `${id}`;
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
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
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

export default DataTablePelicula;
