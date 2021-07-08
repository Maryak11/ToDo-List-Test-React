import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void

}
export const EditTableSpan = React.memo((props: EditTableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = useCallback(() => setEditMode(true), [])
    const offEditMode = useCallback(() => {
        setEditMode(false)
        props.changeTitle(title)
    },[props.changeTitle])
    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),[])



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

})