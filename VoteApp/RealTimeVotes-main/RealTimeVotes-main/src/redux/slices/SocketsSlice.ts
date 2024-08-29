import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { AppList } from "../../types/index";

import io from "socket.io-client";

const socket = io("http://localhost:8081/", {
  transports: ["websocket"],
});

interface SocketState {
  socket: Socket;
  service: boolean;
  list: AppList;
}

const initialState: SocketState = {
  socket: socket,
  service: socket.connected,
  list: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    ServiceStatus: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, service: payload };
    },

    setList: (state, { payload }: PayloadAction<AppList>) => {
      return { ...state, list: payload };
    },
  },
});

export const { ServiceStatus, setList } = socketSlice.actions;
