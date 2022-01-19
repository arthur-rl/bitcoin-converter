import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import { CONVERSION_URI_BASE, TICKER_URI } from "../../constants";

export default function Task2() {

    const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
    const [currencyInput, setCurrencyInput] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState("NONE");

    const [convertedBitcoinPrice, setConvertedBitcoinPrice] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        axios.get(TICKER_URI).then((d) => {
            setAvailableCurrencies(Object.keys(d.data));
        }).catch(e => {
            console.error(e);
        });
    }, []);

    const onFormSubmit = (e: any) => {
        e.preventDefault(); // stop the page from refreshing;
        if(selectedCurrency === "NONE") {
            setErrorMessage("Please select a currency from the dropdown.")
            return;
        }
        setErrorMessage("")
        const query = qs.stringify({
            currency: selectedCurrency,
            value: currencyInput
        });
        axios.get(`${CONVERSION_URI_BASE}?${query}`).then(d => {
            setConvertedBitcoinPrice(String(d.data));
        });
    }

    return (
        <>
            <div className="title text-center mt-5">
                <h1 className="display-3">Task 2</h1>
                <h4 className="display-6">Bitcoin Converter</h4>
            </div>

            <div style={{position: "fixed", left: "50%", transform: "translate(-50%)"}}className="mt-4 mb-5 w-50">
                <form onSubmit={onFormSubmit} className="form">
                    <input required onChange={(e) => setCurrencyInput(Number(e.target.value))} type="number" className="form-control mb-2" placeholder="Input Currency" />
                    <FormSelect onChange={(e) => setSelectedCurrency(e.target.value)} className="mb-2">
                        <option value="NONE">Select Currency</option>
                        {availableCurrencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                    </FormSelect>
                    <input type="submit" className=" btn btn-primary w-100" value="Convert into Bitcoin"/>
                    {errorMessage.length > 0 && (
                        <p className="lead mt-3" style={{color:"#FF0000"}}>{errorMessage}</p>
                    )}
                </form>
                <div className="text-center info mt-4">
                    {convertedBitcoinPrice.length > 0 && (
                        <h1 className="display-1">{convertedBitcoinPrice} <span className="display-4">BTC</span></h1>
                    )}
                </div>
            </div>
        </>
    )
}