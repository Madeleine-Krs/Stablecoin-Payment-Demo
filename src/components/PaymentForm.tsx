import { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";

const coins = ["USDC", "USDT", "DAI"];

export default function PaymentForm({ onPay }: { onPay: (amount: number, coin: string) => void }) {
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("USDC");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPay(Number(amount), coin);
      }}
    >
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        sx={{ 
          marginRight: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        select
        label="Coin"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
        sx={{
          marginRight: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          }
        }}
      >
        {coins.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" type="submit">
        Pay Now
      </Button>
    </form>
  );
}