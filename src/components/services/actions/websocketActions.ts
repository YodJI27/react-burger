import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "LIVE_TABLE_CONNECT">("LIVE_TABLE_CONNECT");
export const wsDisconnect = createAction("LIVE_TABLE_DISCONNECT");

export type TFeedsAction = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;