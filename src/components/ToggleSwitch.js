import React, {useState} from "react"
import {FormControlLabel, Switch, Typography, withStyles} from "@material-ui/core";

export const CustomSwitch = withStyles((theme) => ({
    root: {
        width: 200,
        height: 63,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 2,
        '&$checked': {
            transform: 'translateX(115px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: "lightgray",
                opacity: 1,

            },
        },
        '&$focusVisible $thumb': {
            color: 'white',
        },
    },
    thumb: {
        borderRadius: 35,
        width: 80,
        height: 60,
        backgroundColor: "#2a2d2e"
    },
    track: {
        borderRadius: 35,
        border: `1px solid white`,
        backgroundColor: "lightgray",
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({classes, ...props}) => {
    return (

        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

function ToggleSwitch(props) {
    const {periodMode, setPeriodMode} = props
    const [checked, setChecked] = useState(periodMode === "daily")
    console.log({periodMode,checked})
    function handleChange(e) {
        console.log(e.target.checked)
        setChecked(e.target.checked)
        if (checked) {
            setPeriodMode("daily")
        } else {
            setPeriodMode("weekly")
        }


    }

    return (
        <div style={{
            marginLeft: 40
        }}>
            <FormControlLabel
                label={checked?
                    <Typography style={{fontWeight: 600, fontSize: 15}}>Daily</Typography>
                    :<Typography style={{fontWeight: 600, fontSize: 15}}>Weekly</Typography>
                }
                control={<CustomSwitch checked={checked} onChange={handleChange}/>}
                labelPlacement="end">

            </FormControlLabel></div>
    )
}

export default ToggleSwitch
