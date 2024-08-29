import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/index";
import { ServiceStatus, setList } from "../redux/slices";

export const useSocket = () => {
  const { list, socket } = useAppSelector((state) => state.socketsState);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    socket.on("band-list", (data) => {
      dispatch(setList(data));
    });
  }, []);

  React.useEffect(() => {
    socket.on("connect", () => {
      dispatch(ServiceStatus(socket.connected));
    });
  }, []);

  React.useEffect(() => {
    socket.on("disconnect", () => {
      dispatch(ServiceStatus(socket.connected));
    });
  }, []);

  return {
    list,
  };
};
