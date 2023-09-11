import { GridColDef } from "@mui/x-data-grid";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem: any; // El elemento que se va a actualizar
};

const Update = (props: Props) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        // Prellenar el estado inicial con los datos del elemento seleccionado
        setFormData(props.selectedItem);
    }, [props.selectedItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            console.log(formData);

            return fetch(`http://localhost:4000/glob-guster/${props.slug}/${props.selectedItem.id}`, {
                method: "put",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}s`]);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Actualizar el elemento
        mutation.mutate();
        props.setOpen(false);
        window.location.reload();
    };

    return (
        <div className="update">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Update {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((column) => column.field !== "fecha_inicio" && column.field !== "fecha_entrega")
                        .map((column) => (
                            <div className="item" key={column.field}>
                                <label>{column.headerName}</label>
                                <input
                                    type={column.type}
                                    name={column.field}
                                    placeholder={column.field}
                                    value={formData[column.field] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;