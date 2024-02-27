import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

function Chat({ socket, username, room }) {
  const [product, setProduct] = useState();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      axios({
        url: "http://localhost:5005/send-message",
        method: "POST",
        data: messageData
      }).then((res)=>{
          console.log('Gửi thành công!');
      }).catch(function(err)
      {
        console.log(err + ' Lỗi gửi tin nhắn');
      })

      

      await socket.emit("send_message", messageData);
      
      // setMessageList((list) => [...list, messageData]);
      axios({
        url: "http://localhost:5005/message-list",
        method: "GET",
      }).then((res)=>{
          console.log('Lấy thành công!');
          setMessageList(res.data);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi lấy tin nhắn');
      })

      setCurrentMessage("");

      console.log("Message: ");
      console.log(messageData);
    }
  };

  useEffect(() => {
    getMessages();

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log('receive_message');
      // setMessageList((list) => [...list, product]);
    });
  }, [socket]);

  const getMessages = () => {
    axios({
      url: "http://localhost:5005/message-list",
      method: "GET",
    }).then((res)=>{
        console.log('Lấy thành công!');
        setMessageList(res.data);
    }).catch(function(err)
    {
      console.log(err + ' Lỗi lấy tin nhắn');
    })
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;