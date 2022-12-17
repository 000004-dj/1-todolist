import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./ToDoList.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const getSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const errorClassForInput = (err: boolean) => !err ? "s.inputNoErr" : "input-error"
    const errorMessage = error && <div style={{color: "red"}}>Your data not like in form</div>

    return (
        <div className={s.inputWithButton}>

            <input
                value={title}
                onKeyDown={onEnterAddItem}
                onChange={getSetTitle}
                className={errorClassForInput(error)}/>

            <button
                onClick={addItem}
                className={s.buttonPlus}>
                +
            </button>
            {errorMessage}

        </div>
    )
}