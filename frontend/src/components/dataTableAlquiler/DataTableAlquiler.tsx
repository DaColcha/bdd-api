import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTableAlquiler.scss";
//import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import ModifyAlquiler from "../modify/ModifyAlquiler";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onEditClick: (item: any) => void;
};

const DataTableAlquiler = (props: Props) => {


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      const [cod_alquiler, ciudad] = id.split("-");
      return fetch(`http://localhost:4000/glob-guster/${props.slug}/${cod_alquiler}/${ciudad}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = (id: number, ciudad: string) => {
    //delete the item
    let ID: string;
    ID = `${id}-${ciudad}`;
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
          <div className="delete" onClick={() => handleDelete(params.row.id, params.row.ciudad)}>
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

export default DataTableAlquiler;
