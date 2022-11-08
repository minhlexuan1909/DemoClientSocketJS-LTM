const { WebSocket } = require("ws");

var connection = new WebSocket("ws://127.0.0.1:4444");

connection.onopen = function () {
  console.log("Connected!");
  // connection.send("Ping"); // Send the message 'Ping' to the server
  // const connectInfo = {
  //   clientId: 431,
  //   topic: "B19DCCN431",
  //   type: MqttMessageType.CONNECT,
  //   payload: {},
  // };
  const subscribeInfo = {
    clientId: 431,
    topic: "B19DCCN431",
    type: 3,
    payload: {},
  };
  connection.send(JSON.stringify(subscribeInfo));
  const publishInfo = {
    clientId: 431,
    topic: "B19DCCN431",
    type: 2,
    payload: {
      type: "live-data",
      data: {
        distance: 23.5,
        voltage: 10,
      },
    },
  };
  setTimeout(() => {
    connection.send(JSON.stringify(publishInfo));
  }, 5000);
};

// Log errors
connection.onerror = function (error) {
  console.log("WebSocket Error " + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log("Server: " + e.data);
};
