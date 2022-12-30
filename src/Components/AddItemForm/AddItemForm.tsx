import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../ToDoList/ToDoList.module.css";
import {Button, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

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

            <TextField
                size={"small"}
                label={"Title"}
                error={error}
                helperText={error && errorMessage}

                value={title}
                onKeyDown={onEnterAddItem}
                onChange={getSetTitle}
                className={errorClassForInput(error)}/>

            <Button
                variant={"contained"}
                size={"large"}
                sx={{p: "0px 8px"}}

                onClick={addItem}
                className={s.buttonPlus}
                endIcon={<AddBoxIcon/>}
            >
                Add
            </Button>
            {/*{errorMessage}*/}

        </div>
    )
}
