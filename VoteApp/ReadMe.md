# Case Study 6: Real-Time Voting Application


## Run Locally

Clone the project

```bash
  git clone 
```

Go to the project directory

```bash
  cd dir
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```



<h1 align="center"> Real-Time-Votes</h1>





## Run Locally

> First, you need to run the back-end service
Clone the project

```bash
  git clone 
```

Go to the project directory

```bash
  cd dir
```

Install dependencies

```bash
  yarn install
```

Start the server

# Questions

## 1. How would you implement a real-time WebSocket connection to handle voting updates?

To implement a real-time WebSocket connection for handling voting updates, you can use **Socket.IO**. Here’s a step-by-step approach:

1. **Set Up a Node.js Server**: Create a server using Express and initialize Socket.IO.

    ```javascript
    const express = require('express');
    const { createServer } = require('http');
    const { Server } = require('socket.io');

    const app = express();
    const server = createServer(app);
    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('vote', (option) => {
        io.emit('newVote', option); // Broadcast the vote to all clients
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    server.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
    ```

2. **Client-Side Connection**: In your React component, establish a WebSocket connection using Socket.IO.

    ```javascript
    import React, { useState, useEffect } from 'react';
    import io from 'socket.io-client';

    const socket = io('http://localhost:3001');

    const Voting = () => {
      const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

      useEffect(() => {
        socket.on('newVote', (option) => {
          setVotes((prevVotes) => ({ ...prevVotes, [option]: prevVotes[option] + 1 }));
        });
      }, []);

      const handleVote = (option) => {
        socket.emit('vote', option);
      };

      return (
        <div>
          <h1>Real-Time Voting App</h1>
          <button onClick={() => handleVote('optionA')}>Vote for Option A</button>
          <button onClick={() => handleVote('optionB')}>Vote for Option B</button>
          <div>Option A: {votes.optionA}</div>
          <div>Option B: {votes.optionB}</div>
        </div>
      );
    };

    export default Voting;
    ```

## 2. Describe how to create a voting interface and handle vote submissions in React.

To create a voting interface in React:

1. **UI Design**: Create a simple interface with buttons for each voting option.

2. **State Management**: Use React’s `useState` to manage the vote counts for each option.

3. **Event Handling**: When a user clicks a vote button, trigger an event to send the vote to the server using Socket.IO.

4. **Real-Time Updates**: Use `useEffect` to listen for real-time updates from the server and update the vote counts in the UI.

   Here’s a simple implementation:

   ```javascript
   const Voting = () => {
     const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

     useEffect(() => {
       socket.on('newVote', (option) => {
         setVotes((prevVotes) => ({ ...prevVotes, [option]: prevVotes[option] + 1 }));
       });
     }, []);

     const handleVote = (option) => {
       socket.emit('vote', option);
     };

     return (
       <div>
         <h1>Real-Time Voting App</h1>
         <button onClick={() => handleVote('optionA')}>Vote for Option A</button>
         <button onClick={() => handleVote('optionB')}>Vote for Option B</button>
         <div>Option A: {votes.optionA}</div>
         <div>Option B: {votes.optionB}</div>
       </div>
     );
   };
   ```
   





```bash
  yarn run dev
```


