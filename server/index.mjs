import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";

const httpServer = createServer();
const socketServer = createSocketServer();

let poolOfClient = [];

socketServer.on("connection", (connection) => {
  poolOfClient = [...poolOfClient, connection];

  connection.on("close", () => {
    poolOfClient = poolOfClient.filter((c) => c !== connection);
  });

  /** Событие получения сообщения */
  connection.on("data", (message) => {
    try {
      const parsedData = JSON.parse(message);
      switch (parsedData.type) {
        case "ping":
          connection.write("pong");
          break;
        default:
          connection.write("unknown type");
      }
    } catch (e) {
      console.log(e);
    }
  });
});

socketServer.installHandlers(httpServer);

httpServer.listen(5000);
