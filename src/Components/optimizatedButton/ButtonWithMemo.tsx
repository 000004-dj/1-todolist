import {FilterValuesType} from "../../App";
import React, {memo} from "react";
import {Button} from "@mui/material";

type ButtonWithMemoPropsType = {
    title: string
    getOnClickHandlerCreator: (filter: FilterValuesType) => () => void
    filterValue: "completed" | "active" | "all"
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    variant: "text" | "outlined" | "contained"
}

export const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    let res;
    if (props.filterValue === "all") {
        res = "RENDER ALL"
    } else if (props.filterValue === "active") {
        res = "RENDER ACTIVE"
    } else if (props.filterValue === "completed") {
        res = "RENDER COMPLETED"
    }

    console.log(res)
    return <Button
        sx={{mr: "0px", p: "8px", fontSize: "12px"}}
        onClick={props.getOnClickHandlerCreator(props.filterValue)}
        color={props.color}
        variant={props.variant}

    >
        {props.title}
    </Button>
})