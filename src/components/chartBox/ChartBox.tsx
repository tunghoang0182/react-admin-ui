import "./chartBox.scss"
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    color:string;
    icon:string;
    title:string;
    dataKey:string;
    number:number | string;
    percentage: number;
    chartData: object[]
}





const ChartBox = (props:Props) => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src="/user.svg" alt="" />
                   <span>{props.title}</span>
                </div>
                <h1>{props.number}</h1>
                <Link to="/" style={{color:props.color}}>View All</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <LineChart data={props.chartData}>
                    <Tooltip
                        contentStyle={{ background: "transparent", border: "none" }}
                        labelStyle={{ display: "none" }}
                        position={{ x: 10, y: 70 }}
                    />
                    <Line
                        type="monotone"
                        dataKey={props.dataKey}
                        stroke={props.color}
                        strokeWidth={2}
                        dot={false}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </div>
                <div className="texts"></div>
                <span className="percentage" style={{ color: props.percentage < 0 ? "tomato" : "limegreen", fontWeight: "bold" }}>{props.percentage}%</span>

                <span className="duration">this month</span>
            </div>
        </div>
    )
}

export default ChartBox