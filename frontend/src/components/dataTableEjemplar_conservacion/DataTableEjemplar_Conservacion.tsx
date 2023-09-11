import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTableEjemplar_conservacion.scss";
//import { Link } from "react-router-dom";

// import ModifyAlquiler from "../modify/ModifyAlquiler";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onEditClick: (item: any) => void;
};

const DataTableEjemplar_Conservacion = (props: Props) => {

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
          }
        ]}
      />
    </div>
  );
};

export default DataTableEjemplar_Conservacion;
