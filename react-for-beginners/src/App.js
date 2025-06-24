import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [myCoins, setMyCoins] = useState([]);
    const [budget, setBudget] = useState(0);
    const [selectCoin, setSelectCoin] = useState([]);

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers").then(
            (response) => response.json()).then((json) => {
            setCoins(json);
            setLoading(false);
            setSelectCoin(json[0]);
        });
    }, []);

    const onChangeSelectCoin = (e) => {
        const selectedCoin = coins.find((coin) => coin.id === e.target.value);
        setSelectCoin(selectedCoin);
    }

    const onChangeBudget = (e) => {
        setBudget(e.target.value);
    };

    const onClickBuyCoin = () => {
        const coinPrice = selectCoin.quotes.USD.price;
        const coinAmount = budget / coinPrice;
        const existingCoinIndex = myCoins.findIndex(coin => coin.id === selectCoin.id);
        if (existingCoinIndex >= 0) {
            const updatedCoins = [...myCoins];
            updatedCoins[existingCoinIndex] = {
                ...updatedCoins[existingCoinIndex],
                amount: updatedCoins[existingCoinIndex].amount + coinAmount,
                investedAmount: updatedCoins[existingCoinIndex].investedAmount + parseFloat(budget)
            }
            setMyCoins(updatedCoins);
        } else {
            const purchaseInfo = {
                ...selectCoin,
                amount: coinAmount,
                investedAmount: parseFloat(budget)
            }
            setMyCoins([purchaseInfo, ...myCoins]);
        }
        setBudget(0);
    }

    return (

        <div className="App">
            <div>
                <h1>The Coins! ({coins.length})</h1>
                {loading ? <strong>Loading...</strong> :
                    <select onChange={onChangeSelectCoin}>
                        {coins.map((coin) => (
                            <option value={coin.id}
                                    key={coin.id}>{coin.name} ({coin.symbol}): {coin.quotes.USD.price}</option>
                        ))}
                    </select>}
                <div>
                    <input value={budget} onChange={onChangeBudget} placeholder="$ 예산을 입력하세요."/>
                    <button onClick={onClickBuyCoin} disabled={budget === 0}>구매</button>
                </div>
                <div>
                    <table style={{margin: "0 auto"}}>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>개수</th>
                            <th>구매 총 가격</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myCoins.map((coin, index) => (
                            <tr key={index}>
                                <td>{coin.name}</td>
                                <td>{coin.amount}</td>
                                <td>{coin.investedAmount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
