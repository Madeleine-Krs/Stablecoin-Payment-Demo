export default function TransactionCard({ tx }: { tx: any }) {
  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Transaction Confirmed ✅</h2>
      <p><strong>Amount:</strong> {tx.amount} {tx.coin}</p>
      <p><strong>Status:</strong> {tx.status}</p>
      <p><strong>Hash:</strong> {tx.hash}</p>
      <p><strong>Fee:</strong> ${tx.fee}</p>
    </div>
  );
}
