import { Flow, Step } from "../reducers/walletSync";

export const setWalletSync = (payload: boolean) => ({
  type: payload ? "WALLET_SYNC_ACTIVATE" : "WALLET_SYNC_DEACTIVATE",
  payload,
});

export const setFlow = (payload: { flow: Flow; step: Step }) => ({
  type: "WALLET_SYNC_CHANGE_FLOW",
  payload,
});

export const setFaked = (payload: boolean) => ({
  type: "WALLET_SYNC_FAKED",
  payload,
});
