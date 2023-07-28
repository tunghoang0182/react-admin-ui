import "./home.scss"
import TopBox from  "../../components/topBox/TopBox"
import ChartBox from "../../components/chartBox/ChartBox"
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import { chartBoxUser } from "../../data"
import { chartBoxProduct } from "../../data"
import { chartBoxRevenue } from "../../data"
import { chartBoxConversion } from "../../data"
import { barChartBoxVisit } from "../../data"
import { barChartBoxRevenue } from "../../data"
import BarChartBox from "../../components/barChartBox/BarChartBox"

const Home = () => {
    return (
        <div className="home">
            <div className="box box1">
                <TopBox/>
            </div>
            <div className="box box2"><ChartBox {...chartBoxUser}/></div>
            <div className="box box3"><ChartBox {...chartBoxProduct}/></div>
            <div className="box box4">  <PieChartBox /></div>
            <div className="box box5"><ChartBox {...chartBoxConversion}/></div>
            <div className="box box6"><ChartBox {...chartBoxRevenue}/></div>
            <div className="box box7"><BigChartBox /></div>
            <div className="box box8"><BarChartBox {...barChartBoxVisit}/></div>
            <div className="box box9"><BarChartBox {...barChartBoxRevenue}/></div>
        </div>
    )
}

export default Home