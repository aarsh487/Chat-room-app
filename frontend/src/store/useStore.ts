import { create } from 'zustand';

type socketStore = {
   ws: WebSocket | null;
   messages: string[];
   connectSocket: () => void;
   joinRoom: (room: string) => void;
   sendMessage: (message: string) => void;
   disconnectSocket: () => void;
}

export const useSocketStore = create<socketStore>((set, get) => ({
   ws: null,
   messages: ["hello from server"],

   connectSocket: () => {
      const ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => {
         console.log("User connected to the socket")
      }

      ws.onmessage = (e) => {
         const incomingMessage = e.data;
         set((state) => ({
            messages: [...state.messages, incomingMessage]
         }))
      }

      ws.onclose = () => {
         console.log("The connection has been closed successfully.");
      }

      set({ ws: ws });
   },

   disconnectSocket: () => {
      const ws = get().ws;

      if(ws){
         ws.close();
         console.log("Websocket connection closed");
         set({ ws: null });
      }
   },

   joinRoom: (room) => {
      const ws = get().ws;

      if (ws) {
         const roomJoinMessage = JSON.stringify({ type: "join", payload: { roomId: room } })

         ws.send(roomJoinMessage)
         console.log(`Joining room: ${room}`);
      }

   },

   sendMessage: (message) => {
      const ws = get().ws;

      if(ws) {
         const messageToSend = JSON.stringify({ type: 'chat', payload: { message: message }})

         ws.send(messageToSend);
         console.log("message sent");
      }
   }


}))