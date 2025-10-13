import { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";

const coins = ["USDC", "USDT", "DAI"];

type Prices = {
  USDC: number;
  USDT: number;
  DAI: number;
};

export default function PaymentForm({ onPay }: { onPay: (amount: number, coin: string) => void }) {
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("USDC");
  const [prices, setPrices] = useState<Prices | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (res.ok) {
          const data = await res.json();
          setPrices(data);
        }
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const usdEquivalent = amount && prices ? (Number(amount) * prices[coin as keyof Prices]).toFixed(2) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPay(Number(amount), coin);
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          sx={{ 
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
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }}
        />
        <TextField
          select
          label="Coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          sx={{
            minWidth: 120,
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
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }}
        >
          {coins.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        <Button 
          variant="contained" 
          type="submit"
          sx={{ height: 56 }}
        >
          Pay Now
        </Button>
      </Box>
      {usdEquivalent && (
        <Typography variant="body2" sx={{ mt: 1.5, color: 'white', opacity: 0.8 }}>
          ≈ ${usdEquivalent} USD
        </Typography>
      )}
    </form>
  );
}