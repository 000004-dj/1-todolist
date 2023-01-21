import React, {ChangeEvent, useState, KeyboardEvent, memo, useCallback} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [isEditMode, setIsEditMode] = useState(false)
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const getSetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [setTitle])
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
})