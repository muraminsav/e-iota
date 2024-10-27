import React, { useState, useContext } from "react";
import { messages } from "../utility/helpers";
import { Button } from "./Button";
import { SocketContext } from "../context/SocketContext";
// Example message list
const messageList = messages;
const MessageSelector = () => {
  const { socketState } = useContext(SocketContext);
  // State to hold the selected message
  const [selectedMessage, setSelectedMessage] = useState(messageList[0]);

  // Handle change in selection
  const handleSelectChange = (event) => {
    setSelectedMessage(event.target.value);
  };

  return (
    <div>
      <h2>Select a Message</h2>
      <select value={selectedMessage} onChange={handleSelectChange}>
        {messageList.map((message, index) => (
          <option key={index} value={message}>
            {message}
          </option>
        ))}
      </select>
      <Button
        handelClick={() => socketState.socket.emit("message", selectedMessage)}
        label={"Send!"}
      />
    </div>
  );
};

export default MessageSelector;
