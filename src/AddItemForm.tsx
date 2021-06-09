import React, {ChangeEvent, useState} from "react";
import {IconButton} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";
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

    return (  <div>
            <input
                value={title}
                onChange={onChangeTitle}
                className={error ? "error": ""}
            />
            <IconButton onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>

    )
}