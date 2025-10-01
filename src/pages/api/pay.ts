import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount, coin } = req.body;
  const fakeTx = {
    amount,
    coin,
    status: "Confirmed",
    hash: "0x" + Math.random().toString(16).slice(2, 10),
    fee: "0.01",
  };
  res.status(200).json(fakeTx);
}
