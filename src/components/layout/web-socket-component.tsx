import React, { useEffect, useState } from 'react';

const WebSocketComponent: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/ws/notifications');

        setSocket(ws);

        ws.onmessage = (event) => {
            setResponse(event.data);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.send(message);
        }
    };

    return (
        <div>
            <h1>WebSocket Test</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h2>Server Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default WebSocketComponent;
