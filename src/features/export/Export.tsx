import { Button, CircularProgress, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { fetchUserById, setCardNumber, setToken } from "./exportSlice";
import './Export.css';
import { useState } from "react";

export const Export = () => {
    const token = useAppSelector((state) => state.export.token);
    const cardNumber = useAppSelector((state) => state.export.cardNumber);
    const loading = useAppSelector((state) => state.export.loading);
    const items = useAppSelector((state) => state.export.items);
    const dispatch = useAppDispatch();

    const [ready, setReady] = useState(false);

    async function copyTable() {
        const elTable = document.querySelector<HTMLTableSectionElement>('#table > tbody')!;

       // const blob = new Blob([elTable.innerHTML], { type: "text/html" });

        //await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);

        await navigator.clipboard.writeText(elTable.innerText);
        setReady(true);
        setTimeout(() => setReady(false), 2000);

    }

    return (
    <div className="card">
        <div className="inputs">
            <TextField size="small" label="Token" value={token} onChange={(e) => dispatch(setToken(e.target.value))} />
            <TextField size="small" label="Card" value={cardNumber} onChange={(e) => dispatch(setCardNumber(e.target.value))}/>
        </div>
        <Button variant="contained" className="button" onClick={() => dispatch(fetchUserById())}>Start</Button>
        {loading && <CircularProgress />}
        {items.length > 0 &&
        <>
            <div className="copy-button"><Button variant="outlined" onClick={copyTable}>Copy table to clipboard</Button> {ready && 'Copied'}</div>
            <table className="table" id="table">
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Card name</th>
                        <th>Type</th>
                        <th>Developer</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.number}>
                            <td><a href={`https://smartwebs.tpondemand.com/entity/${item.number}`} target="_blank">{item.number}</a></td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.developer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        }
    </div>
    )
}