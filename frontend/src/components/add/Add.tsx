import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {

  const [FormData, setFormData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({ ...FormData, [name]: value });
  }
  // TEST THE API

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      console.log(FormData)

      return fetch(`http://localhost:4000/glob-guster/${props.slug}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(FormData),
      });

    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item   
    mutation.mutate();
    props.setOpen(false)
    window.location.reload();
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((column) => column.field !== "fecha_inicio" && column.field !== "fecha_entrega")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} name={column.field} placeholder={column.field} onChange={handleChange} />
                
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
