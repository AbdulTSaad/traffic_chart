import React, {useEffect, useState} from 'react'
import {ComposedChart, XAxis, Tooltip, CartesianGrid, Line, Bar, YAxis, Area, Scatter, Legend} from 'recharts';
import {Typography} from "@material-ui/core";
import ReactLoading from "react-loading";

const Chart = ({data_chart, type,string,loading,periodMode}) => {

    // const [color, setColor] = useState("blue")
    // useEffect(() => {
    //     switch (type) {
    //         case "traffic":
    //             setColor("blue");
    //             break
    //         case  "temperature":
    //             setColor("#8e24aa");
    //             break
    //         case   "humidity":
    //             setColor("#1976d2");
    //             break
    //         case   "air-quality":
    //             setColor( "#e64a19");
    //             break
    //         case   "air-pressure":
    //             setColor( "#388e3c" );
    //             break
    //         case  "chance-of-rain":
    //             setColor("#795548");
    //             break
    //         default:
    //             return
    //     }
    // }, type)
    console.log(string)
    // console.log(string?string[`air-pressure`]:"no")
    return (
        !loading&&<div>
            <Typography style={{fontSize: 18,marginTop:80,margin:10}}>{string?string[`${type}`]:""}</Typography>
            {/*{data_chart ? ((data_chart.length <= 0 || (data_chart.length > 0 && !data_chart[1].traffic)) ?*/}
            {/*    <div style={{width: 450, height: 200, display: "grid", placeItems: "center", marginLeft: 50}}>*/}
            {/*        <Typography style={{fontSize: 25, color: "lightgray"}}>No Data to Plot</Typography>*/}
            {/*    </div> :*/}
            {/*    <ComposedChart*/}
            {/*        width={450}*/}
            {/*        height={200}*/}
            {/*        data={data_chart}*/}
            {/*        margin={{top: 5, right: 20, bottom: 5, left: 20}}*/}
            {/*    >*/}
            {/*        <XAxis dataKey="date"*/}
            {/*               angle={periodMode==="weekly"?45:0} interval={0}*/}
            {/*        />*/}
            {/*        /!*<Legend layout="vertical" verticalAlign="middle" align="left"/>*!/*/}
            {/*        <Tooltip/>*/}
            {/*        <CartesianGrid stroke="#f5f5f5"/>*/}
            {/*        <Line type="monotone" dataKey={type}*/}
            {/*              fill={"blue"} yAxisId={0}/>*/}
            {/*        <YAxis/>*/}
            {/*    </ComposedChart>) : null}*/}
        </div>
    )
}

export default Chart
