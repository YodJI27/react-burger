import { createAction } from "@reduxjs/toolkit";

export const wsConnectProfile = createAction<string, "PROFILE_ORDERS_CONNECT">("PROFILE_ORDERS_CONNECT");
export const wsDisconnectProfile = createAction("PROFILE_ORDERS_DISCONNECT");

export type TProfileAction = ReturnType<typeof wsConnectProfile> | ReturnType<typeof wsDisconnectProfile>;