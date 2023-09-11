import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTableTwo.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onEditClick: (item: any) => void;
};

const DataTableTwo = (props: Props) => {


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (deleteParam: string) => {
      const [id, ciudad] = deleteParam.split("-");
      console.log(id, ciudad);
      return fetch(`http://localhost:4000/glob-guster/${props.slug}/${id}/${ciudad}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = (id: number, ciudad: string) => {
    //delete the item
    let deleteParam: string;
    deleteParam= `${id}-${ciudad}`;
    mutation.mutate(deleteParam);
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

export default DataTableTwo;
