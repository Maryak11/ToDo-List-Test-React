import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void

}
export const EditTableSpan = (props: EditTableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)



    return (

        editMode
            ? <TextField
                autoFocus = {true}
                onBlur={offEditMode}
                value={title}
                onChange={onChangeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )

}