import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Chip } from "@mui/material";

type Prices = {
  USDC: number;
  USDT: number;
  DAI: number;
};

export default function PriceDisplay() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error("Failed to fetch prices");
        const data = await res.json();
        setPrices(data);
        setError(null);
      } catch (err) {
        setError("Unable to load prices");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" sx={{ color: "white" }}>
          Loading live prices...
        </Typography>
      </Box>
    );
  }

  if (error || !prices) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ color: "white", mb: 1.5 }}>
        Live Exchange Rates:
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        <Chip
          label={`USDC: $${prices.USDC.toFixed(4)}`}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            fontWeight: 500,
          }}
        />
        <Chip
          label={`USDT: $${prices.USDT.toFixed(4)}`}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            fontWeight: 500,
          }}
        />
        <Chip
          label={`DAI: $${prices.DAI.toFixed(4)}`}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
}
