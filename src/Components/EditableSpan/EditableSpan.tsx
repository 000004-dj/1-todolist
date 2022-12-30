import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [isEditMode, setIsEditMode] = useState(false)
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const getSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && offEditMode()
    }
    return (
        isEditMode
            ? <TextField size={"small"} variant={"standard"} onBlur={offEditMode} autoFocus={true} value={title}
                         onChange={getSetTitle}
                         onKeyDown={onKeyDownEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}