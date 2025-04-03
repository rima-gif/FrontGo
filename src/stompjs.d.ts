// src/stompjs.d.ts
declare module 'stompjs' {
    export type Message = {
      body: string;
    };
  
    export interface Client {
      connect(headers: object, callback: () => void): void;
      subscribe(destination: string, callback: (message: Message) => void): void;
    }
  
    export function over(socket: any): Client;
  }
  