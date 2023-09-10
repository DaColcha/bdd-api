// import { GridColDef } from "@mui/x-data-grid";
// import "./modifyAlquiler.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";

// type Props = {
//   slug: string;
//   columns: GridColDef[];
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   values: string[];
// };

// const ModifyAlquiler = (props: Props) => {

//   const [FormData, setFormData] = useState({});
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {name, value} = e.target
//     setFormData({ ...FormData, [name]: value });
//   }
//   // TEST THE API

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => {
//       console.log(FormData)

//       return fetch(`http://localhost:4000/glob-guster/${props.slug}/${props.values[0]}/${props.values[6]}`, {
//         method: "put",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
        
//         body: JSON.stringify(FormData),
//       });

//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries([`all${props.slug}s`]);
//     },
//   });

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //add new item   
//     mutation.mutate();
//     props.setOpen(false)
//     window.location.reload();
//   };

//   let counter = -1;
//   return (
//     <div className="add">
//       <div className="modal">
//         <span className="close" onClick={() => props.setOpen(false)}>
//           X
//         </span>
//         <h1>Add new {props.slug}</h1>
//         <form onSubmit={handleSubmit}>
//           {props.columns
//             .filter((column) => column.field !== "fecha_inicio" && column.field !== "fecha_entrega")
//             .map((column) => (
//               counter++,
//               <div className="item">
//                 <label>{column.headerName}</label>
//                 if (column.field === "id" || column.field === "cod_emp" || column.field === "cod_agencia" || column.field === "ciudad") {
//                   <input readOnly type={column.type} name={column.field} value={props.values[counter]} onChange={handleChange} />
//                 } else {
//                   <input type={column.type} name={column.field} value={props.values[counter]} onChange={handleChange} />
//                 }                
//               </div>
//             ))}
//           <button>Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModifyAlquiler;
