import { useEffect, useState } from "react";
import { connectSocket } from "../services/socket";

type Coin = {
  symbol: string;
  price: string;
};

function Dashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const socket = connectSocket(token);

    socket.on("connect", () => {
      console.log("Connected socket");
    });

    socket.on("coin-prices", (data: Coin[]) => {
      setCoins(data);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Realtime Coin Prices</h1>

      <button onClick={handleLogout}>Logout</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.symbol}>
                <td>{coin.symbol}</td>
                <td>{Number(coin.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
