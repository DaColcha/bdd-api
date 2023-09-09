import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTableAlquiler.scss";
//import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModifyAlquiler from "../modify/ModifyAlquiler";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTableAlquiler = (props: Props) => {
  // TEST THE API

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
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="action">
          <div className='modify' onClick={() => setOpen(true)}>
            <img src="/view.svg" alt="" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id, params.row.ciudad)}>
            <img src="/delete.svg" alt="" />
          </div>
          {open && <ModifyAlquiler slug="alquiler" columns={props.columns} setOpen={setOpen} values={[`${params.row.id}`, `${params.row.cod_emp}`, `${params.row.cod_agencia}`, `${params.row.cc_socio}`, `${params.row.num_ejemplar}`, `${params.row.cod_pelicula}`, `${params.row.ciudad}`]}/>}
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        getRowId={(row) =>  row.id}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTableAlquiler;
