import { useState } from "react";
import PaymentForm from "../components/PaymentForm";
import TransactionCard from "../components/TransactionCard";

export default function Home() {
  const [transaction, setTransaction] = useState<any>(null);

  const handlePayment = async (amount: number, coin: string) => {
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, coin }),
    });
    const data = await res.json();
    setTransaction(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Stablecoin Payment Demo</h1>
      <PaymentForm onPay={handlePayment} />
      {transaction && <TransactionCard tx={transaction} />}
    </div>
  );
}

