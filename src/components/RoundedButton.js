import React from 'react';
import {Button, styled} from "@material-ui/core";

export const RoundButton = styled(Button)({
    background: 'white',
    borderStyle:"solid",
    borderColor:"blue",
    borderWidth: 2,
    borderRadius: 35,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    color: 'blue',
    textTransform:"none",
    fontSize:12,
    height:35,
    fontWeight:600,
    margin:10,
    marginLeft:30,
    '&:hover': {
        backgroundColor: 'blue',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    }
});
export const CustomizedButton=(props)=>{
    return(
        <Button
        style={{
            background: 'white',
            borderStyle:"solid",
            //borderColor:"blue",
            borderColor:props.color,
            borderWidth: 2,
            borderRadius: 35,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
            //color: 'blue',
            color: props.color,
            textTransform:"none",
            fontSize:12,
            height:35,
            fontWeight:600,
            margin:10,
            marginLeft:30,
            '&:hover': {
               // backgroundColor: 'blue',
                backgroundColor: props.color,
                color: 'white',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            }
        }}
        >{props.children}</Button>
    )
}

//export default CustomizedButton;
