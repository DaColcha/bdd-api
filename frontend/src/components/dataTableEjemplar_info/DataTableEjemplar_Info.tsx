import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTableEjemplar_info.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTableEjemplar_Info = (props: Props) => {
  // TEST THE API

  const queryClient = useQueryClient();
  const mutationEjemplar_info = useMutation({
    mutationFn: (id: string) => {
      const [num_ejemplar, cod_pelicula, ciudad] = id.split("-");
      return fetch(`http://localhost:4000/glob-guster/${props.slug}-info/${num_ejemplar}/${cod_pelicula}/${ciudad}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const mutationEjemplar_conservacion = useMutation({
    mutationFn: (id: string) => {
      const [num_ejemplar, cod_pelicula] = id.split("-");
      return fetch(`http://localhost:4000/glob-guster/${props.slug}-conservacion/${num_ejemplar}/${cod_pelicula}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = (num_ejemplar: number, cod_pelicula: string, ciudad: string) => {
    //delete the item
    let ID1: string;
    let ID2: string;
    ID1 = `${num_ejemplar}-${cod_pelicula}-${ciudad}`;
    ID2 = `${num_ejemplar}-${cod_pelicula}`;
    mutationEjemplar_info.mutate(ID1);
    mutationEjemplar_conservacion.mutate(ID2);
    window.location.reload();
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 75,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => handleDelete(params.row.id, params.row.cod_pelicula, params.row.ciudad)}>
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
          ...props.columns, actionColumn
        ]}
      />
    </div>
  );
};

export default DataTableEjemplar_Info;