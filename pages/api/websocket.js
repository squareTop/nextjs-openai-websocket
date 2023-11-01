import io from 'socket.io-client';

export default async function handler(req, res) {
  const socket = io('https://external-website.com');

  // Handle incoming messages from the external website
  socket.on('message', (data) => {
    console.log('Received message:', data);
  });

  // Send a message to the external website
  socket.emit('message', 'Hello from Next.js!');

  res.status(200).end();
}