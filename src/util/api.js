import React from 'react';

import axios from 'axios';

export const getData = async (currentType, selectedDate, periodMode) => {
    //    const result = await axios.get(`https://aa85t20o0i.execute-api.us-east-2.amazonaws.com/production/`, {
    //         params: {}
    //     })
    console.log({params: {currentType, selectedDate, periodMode}})
    const result = await axios.get(`https://traffic-weather-chart-backend.herokuapp.com/`, {
        params: {currentType, selectedDate, periodMode}
    })
    console.log({result:result.data})
    return result.data
}
