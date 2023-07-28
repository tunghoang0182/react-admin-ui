import "./topBox.scss"
import { topDealUsers } from "../../data"


const TopBox = () => {
    return (
        <div className="topBox">
            <h2>Top Solswitch Deals</h2>
            <div className="list">
                {topDealUsers.map(user => (
                    <div className="listItem" key={user.id}>
                        <div className="user">
                            <img src={user.img} alt="" />
                            <div className="userTexts">
                                <span className="username">{user.username}</span>
                                <div className="email">{user.email}</div>
                            </div>
                        </div>
                        <span className="amount">${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox
