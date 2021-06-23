import React, { useEffect, useState } from 'react'
import { ComposedChart, XAxis, Tooltip, CartesianGrid, Line, Bar, YAxis, Area, Scatter, Legend } from 'recharts';
import { Typography } from "@material-ui/core";
import ReactLoading from "react-loading";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    legend: {
        labels: {
            padding: 40 //default is 10
        },
        display: true,
        position: 'bottom',
        align: 'start',
        padding: 30,
        margin: 50
    },
}));

const Chart = ({ data_chart, type, chartMode, chartStyle, primaryChartStyle }) => {

    const classes = useStyles();

    const [color, setColor] = useState("blue")
    useEffect(() => {
        switch (type) {
            case "traffic":
                setColor("blue");
                break
            case "temperature":
                setColor("#8e24aa");
                break
            case "humidity":
                setColor("#1976d2");
                break
            case "air-quality":
                setColor("#e64a19");
                break
            case "air-pressure":
                setColor("#388e3c");
                break
            case "chance-of-rain":
                setColor("#795548");
                break
            default:
                return
        }
    }, type)

    return (
        data_chart ? ((data_chart.length <= 0 || (data_chart.length > 0 && !data_chart[1].traffic)) ?
            <div style={{ width: 550, height: 400, display: "grid", placeItems: "center", marginLeft: 50 }}>
                <Typography style={{ fontSize: 25, color: "lightgray" }}>No Data to Plot</Typography>
            </div> :
            <ComposedChart
                width={700}
                height={400}
                data={data_chart}
                margin={{ top: 5, right: 20, bottom: 40, left: 20 }}
            >
                <XAxis dataKey="date" />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{position: 'relative', marginTop: '-10px',paddingBottom: '20px',paddingTop: '20px'}} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                {chartStyle === 'Bar' && type !== "traffic" && chartMode === "multiple" &&
                    <Bar type="monotone" dataKey={type} fill={color} yAxisId={0} />}
                {chartStyle === 'Line' && type !== "traffic" && chartMode === "multiple" &&
                    <Line type="monotone" dataKey={type} fill={color} stroke={color} yAxisId={0} />}
                {chartStyle === 'Area' && type !== "traffic" && chartMode === "multiple" &&
                    <Area type="monotone" dataKey={type} fill={color} yAxisId={0} />}
                {chartStyle === 'Scatter' && type !== "traffic" && chartMode === "multiple" &&
                    <Scatter type="monotone" dataKey={type} fill={color} yAxisId={0} />}


                {primaryChartStyle === 'Bar' && chartMode === "multiple" &&
                    <Bar type="monotone" dataKey="traffic" fill={"blue"} yAxisId={0} />}
                {primaryChartStyle === 'Line' && chartMode === "multiple" &&
                    <Line type="monotone" dataKey="traffic" fill={"blue"} stroke={"blue"} yAxisId={0} />}
                {primaryChartStyle === 'Area' && chartMode === "multiple" &&
                    <Area type="monotone" dataKey="traffic" fill={"blue"} yAxisId={0} />}
                {primaryChartStyle === 'Scatter' && chartMode === "multiple" &&
                    <Scatter type="monotone" dataKey="traffic" fill={"blue"} yAxisId={0} />}

                {primaryChartStyle === 'Bar' && chartMode === "single" &&
                    <Bar type="monotone" dataKey={type} fill={color} yAxisId={0} />}
                {primaryChartStyle === 'Line' && chartMode === "single" &&
                    <Line type="monotone" dataKey={type} stroke={color} fill={color} yAxisId={0} />}
                {primaryChartStyle === 'Area' && chartMode === "single" &&
                    <Area type="monotone" dataKey={type} fill={color} yAxisId={0} />}
                {primaryChartStyle === 'Scatter' && chartMode === "single" &&
                    <Scatter type="monotone" dataKey={type} fill={color} yAxisId={0} />}


                <Line type="monotone" dataKey={`${type}-correlation`} fill={"black"} stroke="black" yAxisId={0} />

                <YAxis />
            </ComposedChart>) : null
    )
}

export default Chart
