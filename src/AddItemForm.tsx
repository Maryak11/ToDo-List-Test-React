import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";
import {EditTableSpan} from "./EditTableSpan";
type AddItemForm = {
   addItem: (title:string) => void

}

export function AddItemForm(props: AddItemForm){
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let trueTitle = e.currentTarget.value.trim()
        if (trueTitle){
            setTitle(trueTitle)
            setError(false)
        } else {
            setTitle("")
            setError(true)
        }
    }
    const addItem = () => {
        props.addItem(title)
        setTitle("")
    }

    return (<div>
            <TextField
                value={title}
                onChange={onChangeTitle}
                label={"Добавить"}
                error={error}
                helperText={error && "Tittle is required"}
            />

            <IconButton onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>

    )
}