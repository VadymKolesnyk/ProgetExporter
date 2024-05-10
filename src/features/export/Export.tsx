import { Button, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { fetchUserById, setCardNumber, setToken } from "./exportSlice";
import './Export.css';

export const Export = () => {
    const token = useAppSelector((state) => state.export.token);
    const cardNumber = useAppSelector((state) => state.export.cardNumber);
    const dispatch = useAppDispatch();
    return (
    <div className="card">
        <div className="inputs">
            <TextField size="small" label="Token" value={token} onChange={(e) => dispatch(setToken(e.target.value))} />
            <TextField size="small" label="Card" value={cardNumber} onChange={(e) => dispatch(setCardNumber(e.target.value))}/>
        </div>
        <Button variant="contained" className="button" onClick={() => dispatch(fetchUserById())}>Start</Button>
    </div>
    )
}