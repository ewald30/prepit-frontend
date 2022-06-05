import React, { useState } from "react";
import AnimatedFadeTransition from "../../components/utils/AnimatedFadeTransition";
import { DevToolsState } from "../../core/devtools";
import { BarLoader } from "react-spinners";
import { getDataForAlgorithmChart } from "../../api/devtools/algorithmPlot";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";




const DevToolsPage = () => {
    const [state, setState] = useState(DevToolsState);
    const {chartCalories, chartIterations, chartLoading, chartItems, caloriesChart, occurrencesChart, averageOccurrences} = state;

    function handlePlotChart(){
        console.log(state);
        setState({...state, chartLoading: true})
        const token =  localStorage.getItem('token');


        getChartData();

        async function getChartData(){
            const response = await getDataForAlgorithmChart(chartIterations, chartCalories, token);
            let weightItems  = response.slice();
            let occurrencesItems = response.slice();
            let caloriesItems = response.slice();

            var sum = 0;
            for( var i = 0; i < response.length; i++ ){
                sum += parseInt( response[i].nbOfOccurences, 10 ); //don't forget to add the base
            }

            var avg = sum/response.length;
            // const sum = response.reduce((a,b) => a + b, 0);
            // const avg = (sum / weightItems.length) || 0;
            console.log(sum);


            weightItems = weightItems.sort((a, b) => {
                return a.weight > b.weight?  -1 :  1;
            })

            occurrencesItems = occurrencesItems.sort((a, b) => {
                return a.nbOfOccurences > b.nbOfOccurences?  1 :  -1;
            })

            occurrencesItems.forEach(element => {
                element.targetCalories = chartCalories
            });

            caloriesItems = caloriesItems.sort((a, b) => {
                return a.calories > b.calories?  -1 :  1;
            })


            setState({...state, chartLoading: false, chartItems: weightItems, occurrencesChart: occurrencesItems, caloriesChart: caloriesItems, averageOccurrences: avg})
        }
    }

    return (
        <div className="devtools-page flex-column-center-x flex-column-center-y" style={{'height': '100%'}}>
            <div className="generic-container">
                <div className="algorithm-chart-container flex-column-center-x" >
                    {chartItems? <div className="chart-container flex-column-center-x">
                    <div className="flex-row-center-x">
                    <ResponsiveContainer width={550} height={300}>
                            <LineChart
                                width={"500"}
                                height={"200"}
                                data={chartItems}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line dataKey={"time_score"} stroke={"#ffd163"} dot={false}/>
                            <Line dataKey={"price_score"} stroke={"#ff686e"} dot={false}/>

                            </LineChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width={550} height={300}>
                            <LineChart
                                width={"500"}
                                height={"200"}
                                data={caloriesChart}
                                margin={{
                                    top: 5,
                                    right: 5,
                                    left: 5,
                                    bottom: 5
                                }}
                            >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line dataKey={"calories"} stroke={"#b1bda2"} dot={false}/>
                            <Line dataKey={"targetCalories"} stroke={"#29474a"} dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>   
                    </div>
                    <ResponsiveContainer width={550} height={300}>
                            <LineChart
                                width={"500"}
                                height={"200"}
                                data={chartItems}
                                margin={{
                                    top: 5,
                                    right: 5,
                                    left: 5,
                                    bottom: 5
                                }}
                            >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line dataKey={"nbOfOccurences"} stroke={"#8884d8"} dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>                       
                    </div>:
                    <div>Given "n" number of iterations and a target number of calories, the app can run the suggestion algorithm "n" times and plot a graph with the returned data</div>}
                    {averageOccurrences && <div>Average number of occurrences: {averageOccurrences}</div>}
                    {averageOccurrences && <div>Total number of different meals: {chartItems.length}</div>}

                    <input className="input" type={'number'} placeholder={'Algorithm iterations'} onChange={(event)=>{setState({...state, chartIterations: event.target.value})}} value={chartIterations}/>
                    <input className="input" type={'number'} placeholder={'Target calories'} onChange={(event)=>{setState({...state, chartCalories: event.target.value})}} value={chartCalories}/>
                    <button className="button-primary" onClick={handlePlotChart}>Plot</button>
                    {chartLoading && <BarLoader width={150} height={5} color={'#29474A'} loading={chartLoading}/>}
                </div>
            </div>

        </div>
    )
}

export default DevToolsPage;
