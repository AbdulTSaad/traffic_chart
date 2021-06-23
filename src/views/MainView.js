import React, {useEffect, useState} from 'react'
import Chart from "../components/Chart";
import {
    Button,
    Divider,
    FormControl, FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select, Tooltip, Typography,
} from "@material-ui/core";
import {RoundButton, CustomizedButton} from "../components/RoundedButton";
import CloseIcon from '@material-ui/icons/Close';
import TimeSelector from "../components/TimeSelector";
import {CustomSwitch} from "../components/ToggleSwitch";
import {getData} from "../util/api";
import ReactLoading from 'react-loading';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import CorrelationChart from "../components/CorrelationChart";

const useStyles = makeStyles({
    selected: {
        backgroundColor: 'blue',
        color: "white",
    },
    notSelected: {
        backgroundColor: 'white',
        color: "blue",
    },
    formControl: {
        margin: 10,
        width: 200,
    },
    squareBtnNotSelected: {
        height: 70,
        width: 70,
        background: 'white',
        borderStyle: "solid",
        borderColor: "#2a2d2e",
        borderWidth: 2,
        borderRadius: 35,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        color: '#2a2d2e',
        textTransform: "none",
        fontSize: 12,
        fontWeight: 600,
        marginLeft: 30,
        '&:hover': {
            backgroundColor: '#2a2d2e',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }
    },
    squareBtnSelected: {
        height: 70,
        width: 70,
        background: '#2a2d2e',
        borderStyle: "solid",
        borderColor: "#2a2d2e",
        borderWidth: 2,
        borderRadius: 35,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        color: 'white',
        textTransform: "none",
        fontSize: 12,
        fontWeight: 600,
        marginLeft: 30,
        '&:hover': {
            backgroundColor: '#2a2d2e',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }
    }
});
const chartStyles = [
    'Bar', 'Area', 'Scatter', 'Line'
]
const description = [
    "Choose Traffic only",
    "Choose data set to visualize",
    "Choose data set to visualize",
    "Choose data set to visualize",
    "Choose data set to visualize",
    "Choose data set to visualize",
    "Daily: Shows data gathered - Spread throughout only one day (24 hrs), Weekly : Shows average value of data spread throughout 7 days. ",
    "Show data for only one chosen parameter",
    "Combination chart : shows data for 'traffic' vs 'chosen parameter",
    "Select Chart Style",
    "Select Chart Style",
    "Navigate back to Home page",]

const MainView = () => {
    const classes = useStyles();
    const [data, setData] = useState(null)
    const [corelation, setCorelation] = useState(null)
    const [corelationString, setCorelationString] = useState(null)
    const [periodMode, setPeriodMode] = useState("daily")//daily / weekly
    const [chartMode, setChartMode] = useState("single") //single / multiple
    const [currentType, setCurrentType] = useState("traffic")
    const [selectedDate, setSelectedDate] = useState(new Date().getTime());
    const [loading, setLoading] = useState(false);
    const [chartStyle, setChartStyle] = useState('Bar')
    const [primaryChartStyle, setPrimaryChartStyle] = useState('Line')
    const [showTip, setShowTip] = useState(false)

    useEffect(async () => {
        if (!data) {
            setLoading(true)
            const data = await getData(currentType, selectedDate, periodMode)
            setData(data.data)
            setCorelation(data.corelation);
            setCorelationString(data.corelationString)
            setLoading(false)
        }
    })

    useEffect(async () => {
        setLoading(true)
        const data = await getData(currentType, selectedDate, periodMode)
        setData(data.data)
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }, [selectedDate, periodMode])

    async function trafficVsTemp() {
        setCurrentType("temperature")
        setLoading(true)
        const data = await getData("temperature", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    async function trafficVsHumidity() {
        setCurrentType("humidity")
        setLoading(true)
        const data = await getData("humidity", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    async function OnlyTraffic() {
        setCurrentType("traffic")
        setLoading(true)
        const data = await getData("traffic", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    async function trafficVsAirQuality() {
        setCurrentType("air-quality")
        setLoading(true)
        const data = await getData("air-quality", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    async function trafficVsAirPressure() {
        setCurrentType("air-pressure")
        setLoading(true)
        const data = await getData("air-pressure", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    async function trafficVsChanceOfRain() {
        setCurrentType("chance-of-rain")
        setLoading(true)
        const data = await getData("chance-of-rain", selectedDate, periodMode)
        setData(data.data);
        setCorelation(data.corelation);
        setCorelationString(data.corelationString)
        setLoading(false)
    }

    function handleDateChange(newDate) {
        setSelectedDate(newDate.getTime())

    }

    function handleStyleChange(e) {
        setChartStyle(e.target.value)
    }

    function handlePrimaryStyleChange(e) {
        setPrimaryChartStyle(e.target.value)
    }

    return (
        <div style={{backgroundColor: "white", height: "100vh"}}>
            <div style={{
                height: "75vh", paddingTop: 1,
                background: " linear-gradient(186deg, rgba(3,186,207,1) 0%, rgba(4,120,250,1) 41%, rgba(1,82,140,1) 100%)"
            }}>
                {showTip ? <Paper style={{margin: 70, marginTop: 20, padding: 10}} elevation={5}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Grid item style={{display: "flex", marginBottom: 10}} direction="row" container>
                                <Grid item>
                                    <div style={{display: "flex", marginBottom: 10, paddingTop: 10}}>
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[0]} </h2>}>
                                            <RoundButton onClick={OnlyTraffic}
                                                         className={currentType === "traffic" ? classes.selected : classes.notSelected}>Traffic
                                            </RoundButton>
                                        </Tooltip>
                                        {chartMode === "multiple" && <div style={{paddingTop: 15, minWidth: 27}}>
                                            {currentType !== "traffic" &&
                                            <CloseIcon fontSize="large" style={{color: "blue"}}/>}
                                        </div>}
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[1]} </h2>}>
                                            <RoundButton onClick={trafficVsTemp}
                                                         //className={currentType === "temperature" ? classes.selected : classes.notSelected}
                                                         style={{
                                                             backgroundColor: currentType === "temperature" ? "#8e24aa" : "white",
                                                             color: currentType === "temperature" ? "white" : "#8e24aa",
                                                             borderColor: "#8e24aa",
                                                         }}
                                            >
                                                Temperature
                                            </RoundButton>
                                        </Tooltip>
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[2]} </h2>}>
                                            <RoundButton onClick={trafficVsHumidity}
                                                         //className={currentType === "humidity" ? classes.selected : classes.notSelected}
                                                         style={{
                                                             backgroundColor: currentType === "humidity" ? "#1976d2" : "white",
                                                             color: currentType === "humidity" ? "white" : "#1976d2",
                                                             borderColor: "#1976d2",
                                                         }}
                                            >Humidity
                                            </RoundButton>
                                        </Tooltip>
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[3]} </h2>}>
                                            <RoundButton onClick={trafficVsAirQuality}
                                                         //className={currentType === "air-quality" ? classes.selected : classes.notSelected}
                                                         style={{
                                                             backgroundColor: currentType === "air-quality" ? "#e64a19" : "white",
                                                             color: currentType === "air-quality" ? "white" : "#e64a19",
                                                             borderColor: "#e64a19",
                                                         }}
                                            >Air
                                                Quality</RoundButton>
                                        </Tooltip>
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[4]} </h2>}>
                                            <RoundButton onClick={trafficVsAirPressure}
                                                         //className={currentType === "air-pressure" ? classes.selected : classes.notSelected}
                                                         style={{
                                                             backgroundColor: currentType === "air-pressure" ? "#388e3c" : "white",
                                                             color: currentType === "air-pressure" ? "white" : "#388e3c",
                                                             borderColor: "#388e3c",
                                                         }}
                                            >Air
                                                Pressure</RoundButton>
                                        </Tooltip>
                                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[5]} </h2>}>
                                            <RoundButton onClick={trafficVsChanceOfRain}
                                                        // className={currentType === "chance-of-rain" ? classes.selected : classes.notSelected}
                                                         style={{
                                                             backgroundColor: currentType === "chance-of-rain"  ? "#795548": "white",
                                                             color: currentType === "chance-of-rain"  ? "white" : "#795548",
                                                             borderColor: "#795548",
                                                         }}
                                            >Chance
                                                of Rain

                                            </RoundButton>
                                        </Tooltip>
                                    </div>
                                </Grid>
                                <Grid item style={{backgroundColor: "blue", width: 0.5, marginLeft: 20}}>
                                    <div/>
                                </Grid>
                                <Grid item style={{display: "flex"}}>
                                    {/*<ToggleSwitch periodMode={periodMode} setPeriodMode={setPeriodMode}/>*/}
                                    {/* <Tooltip title={description[9]}>*/}
                                    <Tooltip title={<h2 style={{color: "lightblue"}}>{description[6]} </h2>}>
                                        <div style={{
                                            marginLeft: 40
                                        }}>
                                            <FormControlLabel
                                                label={periodMode === "daily" ?
                                                    <Typography style={{fontWeight: 600, fontSize: 15}}>Daily</Typography>
                                                    :
                                                    <Typography style={{fontWeight: 600, fontSize: 15}}>Weekly</Typography>
                                                }
                                                control={

                                                    <CustomSwitch checked={periodMode === "daily"}
                                                                  onChange={(e) => {
                                                                      if (e.target.checked) {
                                                                          setPeriodMode("daily")
                                                                      } else {
                                                                          setPeriodMode("weekly")
                                                                      }
                                                                  }}/>

                                                }
                                                labelPlacement="end">

                                            </FormControlLabel>
                                        </div>
                                    </Tooltip>
                                    {/*</Tooltip>*/}
                                    {/*<div style={{paddingTop: 10}}>*/}
                                    {/*    {loading && <ReactLoading type="bars" color="blue"/>}*/}
                                    {/*</div>*/}
                                    <Tooltip title={<h2 style={{color: "lightblue"}}>Show Tool Tips</h2>}>
                                        <Button
                                            onClick={() => {
                                                setShowTip(!showTip)
                                            }}
                                            className={showTip ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                        ><ContactSupportIcon fontSize="large"/>
                                        </Button>
                                    </Tooltip>


                                </Grid>

                            </Grid>
                            <Grid item>
                                <Divider orientation="horizontal" style={{backgroundColor: "blue", height: 1}}/>
                            </Grid>
                            <Grid item container
                                  direction="row"
                                  justify="space-around"
                                  alignItems="flex-start"
                                  style={{marginTop: 20,}}
                            >
                                <Grid item>
                                    {loading ?
                                        <div style={{
                                            width: 510,
                                            height: 400,
                                            display: "grid",
                                            placeItems: "center",
                                            marginLeft: 90,
                                        }}>
                                            <div style={{display: "flex"}}>
                                                <Typography
                                                    style={{fontSize: 25, color: "lightgray"}}> Loading </Typography>
                                                <div style={{marginTop: -15, marginLeft: 15}}>
                                                    <ReactLoading type="bars" color="blue"/>
                                                </div>
                                            </div>

                                        </div> :
                                        <Chart data_chart={data} type={currentType} chartMode={chartMode}
                                               chartStyle={chartStyle} primaryChartStyle={primaryChartStyle}/>}
                                </Grid>
                                <Grid item >
                                    <div style={{display:'block'}}>
                                        <TimeSelector selectedDate={selectedDate} showTip={showTip}
                                                      setSelectedDate={handleDateChange}/>
                                        {/*<CorrelationChart data_chart={corelation} type={currentType} string={corelationString}/>*/}
                                    </div>
                                </Grid>

                                {/*<Typography>Traffic Vs { capitalizeFirstLetter(currentType)}</Typography>*/}

                            </Grid>
                            <Grid item>
                                {/*<TrafficTable data={data} setData={setData} type={currentType}/>*/}
                            </Grid>
                        </Grid></Paper> :
                    <Paper style={{margin: 70, marginTop: 20, padding: 10}} elevation={5}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Grid item style={{display: "flex", marginBottom: 10}} direction="row" container>
                                <Grid item>
                                    <div style={{display: "flex", marginBottom: 10, paddingTop: 10}}>

                                        <RoundButton onClick={OnlyTraffic}
                                                     className={currentType === "traffic" ? classes.selected : classes.notSelected}>Traffic
                                        </RoundButton>

                                        {chartMode === "multiple" && <div style={{paddingTop: 15, minWidth: 27}}>
                                            {currentType !== "traffic" &&
                                            <CloseIcon fontSize="large" style={{color: "blue"}}/>}
                                        </div>}

                                        <RoundButton onClick={trafficVsTemp}
                                            //className={currentType === "temperature" ? classes.selected : classes.notSelected}
                                                     style={{
                                                         backgroundColor: currentType === "temperature" ? "#8e24aa" : "white",
                                                         color: currentType === "temperature" ? "white" : "#8e24aa",
                                                         borderColor: "#8e24aa",
                                                     }}
                                        > Temperature
                                        </RoundButton>


                                        <RoundButton onClick={trafficVsHumidity}
                                            //className={currentType === "humidity" ? classes.selected : classes.notSelected}
                                                     style={{
                                                         backgroundColor: currentType === "humidity" ? "#1976d2" : "white",
                                                         color: currentType === "humidity" ? "white" : "#1976d2",
                                                         borderColor: "#1976d2",
                                                     }}
                                        >Humidity
                                        </RoundButton>

                                        <RoundButton onClick={trafficVsAirQuality}
                                            //className={currentType === "air-quality" ? classes.selected : classes.notSelected}
                                                     style={{
                                                         backgroundColor: currentType === "air-quality" ? "#e64a19" : "white",
                                                         color: currentType === "air-quality" ? "white" : "#e64a19",
                                                         borderColor: "#e64a19",
                                                     }}
                                        >Air
                                            Quality</RoundButton>

                                        <RoundButton onClick={trafficVsAirPressure}
                                            //className={currentType === "air-pressure" ? classes.selected : classes.notSelected}
                                                     style={{
                                                         backgroundColor: currentType === "air-pressure" ? "#388e3c" : "white",
                                                         color: currentType === "air-pressure" ? "white" : "#388e3c",
                                                         borderColor: "#388e3c",
                                                     }}
                                        >Air
                                            Pressure</RoundButton>

                                        <RoundButton onClick={trafficVsChanceOfRain}
                                            // className={currentType === "chance-of-rain" ? classes.selected : classes.notSelected}
                                                     style={{
                                                         backgroundColor: currentType === "chance-of-rain"  ? "#795548": "white",
                                                         color: currentType === "chance-of-rain"  ? "white" : "#795548",
                                                         borderColor: "#795548",
                                                     }}
                                        >Chance
                                            of Rain
                                        </RoundButton>

                                    </div>
                                </Grid>
                                <Grid item style={{backgroundColor: "blue", width: 0.5, marginLeft: 20}}>
                                    <div/>
                                </Grid>
                                <Grid item style={{display: "flex"}}>
                                    {/*<ToggleSwitch periodMode={periodMode} setPeriodMode={setPeriodMode}/>*/}
                                    {/* <Tooltip title={description[9]}>*/}
                                    <div style={{
                                        marginLeft: 40
                                    }}>
                                        <FormControlLabel
                                            label={periodMode === "daily" ?
                                                <Typography style={{fontWeight: 600, fontSize: 15}}>Daily</Typography>
                                                :
                                                <Typography style={{fontWeight: 600, fontSize: 15}}>Weekly</Typography>
                                            }
                                            control={<CustomSwitch checked={periodMode === "daily"}
                                                                   onChange={(e) => {
                                                                       if (e.target.checked) {
                                                                           setPeriodMode("daily")
                                                                       } else {
                                                                           setPeriodMode("weekly")
                                                                       }
                                                                   }}/>}
                                            labelPlacement="end">

                                        </FormControlLabel></div>
                                    {/*</Tooltip>*/}
                                    {/*<div style={{paddingTop: 10}}>*/}
                                    {/*    {loading && <ReactLoading type="bars" color="blue"/>}*/}
                                    {/*</div>*/}
                                    <div style={{zIndex: 20}}>
                                        <Button
                                            onClick={() => {
                                                setShowTip(!showTip)
                                            }}
                                            className={showTip ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                        ><ContactSupportIcon fontSize="large"/>
                                        </Button>
                                    </div>


                                </Grid>

                            </Grid>
                            <Grid item>
                                <Divider orientation="horizontal" style={{backgroundColor: "blue", height: 1}}/>
                            </Grid>
                            <Grid item container
                                  direction="row"
                                  justify="space-around"
                                  alignItems="flex-start"
                                  style={{marginTop: 20,}}
                            >
                                <Grid item>
                                    {loading ?
                                        <div style={{
                                            width: 510,
                                            height: 400,
                                            display: "grid",
                                            placeItems: "center",
                                            marginLeft: 90,
                                        }}>
                                            <div style={{display: "flex"}}>
                                                <Typography
                                                    style={{fontSize: 25, color: "lightgray"}}> Loading </Typography>
                                                <div style={{marginTop: -15, marginLeft: 15}}>
                                                    <ReactLoading type="bars" color="blue"/>
                                                </div>
                                            </div>

                                        </div> :
                                        <Chart data_chart={data} type={currentType} chartMode={chartMode} corelation={corelation}
                                               chartStyle={chartStyle} primaryChartStyle={primaryChartStyle}/>}
                                </Grid>
                                <Grid item>
                                      <div style={{display:'block'}}>
                                    <TimeSelector selectedDate={selectedDate} showTip={showTip}
                                                          setSelectedDate={handleDateChange}/>
                                          <CorrelationChart data_chart={corelation} type={currentType} string={corelationString} loading={loading} periodMode={periodMode} />
                                      </div>
                                      </Grid>
                                {/*<Typography>Traffic Vs { capitalizeFirstLetter(currentType)}</Typography>*/}

                            </Grid>
                            <Grid item>
                                {/*<TrafficTable data={data} setData={setData} type={currentType}/>*/}
                            </Grid>
                        </Grid></Paper>
                }
                <div style={{width: "80%", display: "flex", paddingLeft: 100, marginTop: -50,}}>

                    {showTip ?
                        <div style={{width: "60%", textAlign: "left", display: "flex", paddingLeft: 100}}>
                            <Tooltip title={<h2 style={{color: "lightblue"}}>{description[7]} </h2>}>
                                <Button
                                    className={chartMode === "single" ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                    onClick={() => setChartMode("single")}
                                ><ShowChartIcon fontSize="large"/></Button>
                            </Tooltip>
                            <Tooltip title={<h2 style={{color: "lightblue"}}>{description[8]} </h2>}>
                                <Button
                                    className={chartMode === "multiple" ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                    onClick={() => setChartMode("multiple")}
                                ><MultilineChartIcon fontSize="large"/></Button>
                            </Tooltip>
                        </div> :
                        <div style={{width: "60%", textAlign: "left", display: "flex", paddingLeft: 100}}>

                            <Button
                                className={chartMode === "single" ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                onClick={() => setChartMode("single")}
                            ><ShowChartIcon fontSize="large"/></Button>


                            <Button
                                className={chartMode === "multiple" ? classes.squareBtnSelected : classes.squareBtnNotSelected}
                                onClick={() => setChartMode("multiple")}
                            ><MultilineChartIcon fontSize="large"/></Button>

                        </div>
                    }

                    <div style={{width: "40%", textAlign: "right", paddingLeft: 100, display: "flex", zIndex: 0}}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Primary Chart Style</InputLabel>
                            {showTip ?
                                <Tooltip title={<h2 style={{color: "lightblue"}}>{description[9]} </h2>}>
                                    <Select
                                        value={primaryChartStyle}
                                        onChange={handlePrimaryStyleChange}
                                        label="Primary Chart Style"
                                    >
                                        {chartStyles.map((e => (
                                            <MenuItem key={e} value={e}>
                                                {e}
                                            </MenuItem>
                                        )))}

                                    </Select>
                                </Tooltip> :
                                <Select
                                    value={primaryChartStyle}
                                    onChange={handlePrimaryStyleChange}
                                    label="Primary Chart Style"
                                >
                                    {chartStyles.map((e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    )))}

                                </Select>}
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Secondary Chart Style</InputLabel>
                            {showTip ?
                                <Tooltip title={<h2 style={{color: "lightblue"}}>{description[10]} </h2>}>
                                    <Select

                                        value={chartStyle}
                                        onChange={handleStyleChange}
                                        label="Secondary Chart Style"
                                    >
                                        {chartStyles.map((e => (
                                            <MenuItem key={e} value={e}>
                                                {e}
                                            </MenuItem>
                                        )))}

                                    </Select>
                                </Tooltip> :
                                <Select

                                    value={chartStyle}
                                    onChange={handleStyleChange}
                                    label="Secondary Chart Style"
                                >
                                    {chartStyles.map((e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    )))}

                                </Select>}
                        </FormControl>
                        <Tooltip title={<h2 style={{color: "lightblue"}}>{description[11]} </h2>}>
                            <Button
                                // onClick={() => {
                                //     setShowTip(!showTip)
                                // }}
                                className={classes.squareBtnNotSelected}
                            ><HomeIcon fontSize="large"/>
                            </Button>
                        </Tooltip>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default MainView
