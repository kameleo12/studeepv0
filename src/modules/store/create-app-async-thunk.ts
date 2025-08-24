import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/app-state";
import { Dependencies } from "../store/dependencies";
import { AppDispatch } from "../store/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: Dependencies;
}>();
