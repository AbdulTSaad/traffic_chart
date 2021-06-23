import React, {useState} from 'react';
import {createMuiTheme, FormControlLabel, Grid, makeStyles, Paper, Tooltip, Typography} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    //DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {ThemeProvider} from "@material-ui/styles";

import DateTimePicker from 'react-datetime-picker';
import {CustomSwitch} from "./ToggleSwitch";

const useStyles = makeStyles({
    paper: {
        //background: " linear-gradient(180deg, rgba(202,207,3,1) 0%, rgba(250,62,4,1) 0%, rgba(235,255,8,1) 72%)",
        padding: 20
    }
});
const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                //background: "linear-gradient(180deg, rgba(8,127,255,1) 0%, rgba(0,32,242,1) 21%, rgba(2,0,255,1) 100%)",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "blue",
            },
        },
    },
});

function TimeSelector(props) {
    const classes = useStyles()
    const {showTip}=props
    //const [selectedDate, setSelectedDate] = useState(props.selectedDate);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [am, setAm] = useState(true);

    function handleDateChange(date) {

        if (am) {
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
        } else {
            date.setHours(12)
            date.setMinutes(0)
            date.setSeconds(0)
        }
        setSelectedDate(date)
        props.setSelectedDate(date)
    }

    console.log(selectedDate)
    return (
        <Paper elevation={2}
               className={classes.paper}
        >
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                style={{zIndex: 20}}
            >
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/*<ThemeProvider theme={materialTheme}>*/}
                        {/*    <DateTimePicker*/}
                        {/*        value={selectedDate}*/}
                        {/*        onChange={handleDateChange}*/}
                        {/*        disableFuture*/}
                        {/*        variant="static"*/}
                        {/*        autoOk*/}
                        {/*        animateYearScrolling*/}
                        {/*        showTodayButton*/}
                        {/*    />*/}
                        {/*</ThemeProvider>*/}
                        <DateTimePicker
                            disableClock
                            format={"dd : MM : y"}
                            clearIcon={null}
                            onChange={handleDateChange}
                            value={selectedDate}
                        />
                        <div style={{}}>
                            <FormControlLabel
                                label={am ?
                                    <Typography style={{fontWeight: 600, fontSize: 15}}>00 - 12</Typography>
                                    : <Typography style={{fontWeight: 600, fontSize: 15}}>12 - 24</Typography>
                                }
                                control={showTip?
                                    <Tooltip title={<h2 style={{color: "lightblue"}}>Select time range of the day between 00:00-12:00 and 12:00 - 24:00</h2>}>
                                    <CustomSwitch checked={am}
                                                       onChange={(e) => {
                                                           if (e.target.checked) {
                                                               setAm(true)
                                                               let date = selectedDate
                                                               date.setHours(0)
                                                               date.setMinutes(0)
                                                               date.setSeconds(0)
                                                               setSelectedDate(date)
                                                               props.setSelectedDate(date)
                                                           } else {
                                                               setAm(false)
                                                               let date = selectedDate
                                                               date.setHours(12)
                                                               date.setMinutes(0)
                                                               date.setSeconds(0)
                                                               setSelectedDate(date)
                                                               props.setSelectedDate(date)
                                                           }
                                                       }}/>
                                 </Tooltip>:
                                    <CustomSwitch checked={am}
                                                  onChange={(e) => {
                                                      if (e.target.checked) {
                                                          setAm(true)
                                                          let date = selectedDate
                                                          date.setHours(0)
                                                          date.setMinutes(0)
                                                          date.setSeconds(0)
                                                          setSelectedDate(date)
                                                          props.setSelectedDate(date)
                                                      } else {
                                                          setAm(false)
                                                          let date = selectedDate
                                                          date.setHours(12)
                                                          date.setMinutes(0)
                                                          date.setSeconds(0)
                                                          setSelectedDate(date)
                                                          props.setSelectedDate(date)
                                                      }
                                                  }}/>
                                }
                                labelPlacement="end">

                            </FormControlLabel></div>
                    </MuiPickersUtilsProvider>
                </Grid>

            </Grid>
        </Paper>
    );
}

export default TimeSelector;
