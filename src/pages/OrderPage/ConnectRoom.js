import './ConnectRoom.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Order from './Order';

const socket = io.connect("http://localhost:5005");

function ConnectRoom() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };  

  return (

    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Order socket={socket} username={username} room={room} />
      )}
    </div>

    // <div>
    //   <BrowserRouter>
    //     <NavBar />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<LoginSignup />} />
    //       <Route path="/user/login" element={<Login />} />
    //       <Route path="/user/order-list" element={<Order />} />
    //       <Route path="/logout" element={<LogOut />} />
    //       <Route path="/products/:id" element={<ProductDetails />} />
    //       <Route path="/products" element={<Products />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default ConnectRoom;