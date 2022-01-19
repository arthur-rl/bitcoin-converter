import axios from "axios";
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { TICKER_URI } from "../../constants";
import BitcoinPrice from "../../types/BitcoinPrice";

export default function Task1() {
    const [bitcoinPrices, setBitcoinPrices] = useState<{ [key: string]: BitcoinPrice }>({});

    useEffect(() => {
        axios.get(TICKER_URI).then((d) => {
            setBitcoinPrices(d.data);
        }).catch(e => {
            console.error(e);
        });
    }, [])

    return (
        <>
            <div className="title text-center mt-5">
                <h1 className="display-3">Task 1</h1>
            </div>
            <div className="text-center price-table p-3">
                <Table>
                    <thead>
                        <th>Symbol</th>
                        <th>15m</th>
                        <th>Last</th>
                        <th>Buy</th>
                        <th>Sell</th>
                    </thead>
                    <tbody>
                        {Object.entries(bitcoinPrices).map(([key, price]) => {
                            const formatter = new Intl.NumberFormat(price.symbol, { style: 'currency', currency: price.symbol, maximumSignificantDigits: 3 });
                            return (
                                <tr>
                                    <td>{ price.symbol }</td>
                                    <td>{ formatter.format(price["15m"]) }</td>
                                    <td>{ formatter.format(price.last) }</td>
                                    <td>{ formatter.format(price.buy) }</td>
                                    <td>{ formatter.format(price.sell) }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}