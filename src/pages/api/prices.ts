import type { NextApiRequest, NextApiResponse } from "next";

type CoinGeckoResponse = {
  [key: string]: {
    usd: number;
  };
};

type PriceData = {
  USDC: number;
  USDT: number;
  DAI: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PriceData | { error: string }>
) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,tether,dai&vs_currencies=usd"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data: CoinGeckoResponse = await response.json();

    const prices: PriceData = {
      USDC: data["usd-coin"]?.usd || 1.0,
      USDT: data["tether"]?.usd || 1.0,
      DAI: data["dai"]?.usd || 1.0,
    };

    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch cryptocurrency prices" });
  }
}
