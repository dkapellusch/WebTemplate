import { Express } from "express-serve-static-core";
import * as http from 'http';
import * as WebSocket from 'ws';
import { Server } from "http";

export function configureSocketServer(server: Server) {

    const socketServer = new WebSocket.Server({ server: server, path:"/ws" });

    socketServer.on('connection', (socket: WebSocket) => {

        socket.on('message', (message: string) => {

            console.log('received: %s', message);
            socket.send(`Hello, you sent -> ${message}`);
            setTimeout(() => socket.send("Hi this is a follow up, hope you are good!"), 3000);
        });

    });
    
    socketServer.on("error", () => console.log("connection error oh well"));
    return socketServer;
}