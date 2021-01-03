import { useRef } from "react";
import SockJsClient from "sockjs-client";

const socketServer = "http://localhost:5000";

function App() {
  const wsConn = useRef(new SockJsClient(socketServer));

  function handleClick() {
    if (wsConn && wsConn.readyState === 1) {
      wsConn.current.send(JSON.stringify({ type: "ping" }));
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Ping</button>
    </div>
  );
}

export default App;
