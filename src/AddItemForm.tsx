import React, {ChangeEvent, useState} from "react";
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
            <button onClick={addItem}>+</button>
        </div>

    )
}