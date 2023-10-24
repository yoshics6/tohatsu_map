import {
  Action,
  combineReducers,
  AnyAction,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { loginReducer } from "@/features/admin/login";
import { newsReducer } from "@/features/admin/news";
import { userReducer } from "@/features/admin/user";
import { contactYearReqReducer } from "@/features/admin/contact_year_req";
import { contactBrocReqReducer } from "@/features/admin/contact_broc_req";
import { contactTohaReqReducer } from "@/features/admin/contact_toha_req";
import { bannerReducer } from "@/features/admin/banner";
import { coverPaperReducer } from "@/features/admin/cover_paper";
import { textPaperReducer } from "@/features/admin/text_paper";
import { textNoReducer } from "@/features/admin/text_no";
import { printingReducer } from "@/features/admin/printing";
import { saddleReducer } from "@/features/admin/saddle_stitch";
import { perfectBindingReducer } from "@/features/admin/perfect_binding";
import { foldingReducer } from "@/features/admin/folding";
import { cuttingSheetReducer } from "@/features/admin/cutting_sheet";
import { salesSummaryReducer } from "@/features/admin/sales_summary";
import { salesSaddleStitchReducer } from "@/features/admin/sales_saddle_stitch";
import { salesPerfectBindingReducer } from "@/features/admin/sales_perfect_binding";
import { salesFoldingReducer } from "@/features/admin/sales_folding";
import { salesCuttingSheetReducer } from "@/features/admin/sales_cutting_sheet";
import { calendarReducer } from "@/features/admin/calendar";
import { salesCalendarReducer } from "@/features/admin/sales_calendar";
import { paperBagReducer } from "@/features/admin/paper_bag";
import { salesPaperBagReducer } from "@/features/admin/sales_paper_bag";
import { plasticFileBagReducer } from "@/features/admin/plastic_file";
import { salesplasticFileReducer } from "@/features/admin/sales_plastic_file";
import { envelopeBagReducer } from "@/features/admin/envelope";
import { salesEnvelopeReducer } from "@/features/admin/sales_envelope";
import { downloadsBrochureReducer } from "@/features/admin/downloads_brochure";
import { downloadsManualsReducer } from "@/features/admin/downloads_manuals";
import { OcReducer } from "@/features/admin/outboards_category";
import { FindDealerReducer } from "@/features/admin/find_dealer";

const combinedReducer: any = combineReducers({
  login: loginReducer,
  news: newsReducer,
  user: userReducer,
  contact_year_req: contactYearReqReducer,
  contact_broc_req: contactBrocReqReducer,
  contact_toha_req: contactTohaReqReducer,
  banner: bannerReducer,
  cover_paper: coverPaperReducer,
  text_paper: textPaperReducer,
  text_no: textNoReducer,
  printing: printingReducer,
  saddle_stitch: saddleReducer,
  perfect_binding: perfectBindingReducer,
  folding: foldingReducer,
  cutting_sheet: cuttingSheetReducer,
  sales_summary: salesSummaryReducer,
  sales_saddle_stitch: salesSaddleStitchReducer,
  sales_perfect_binding: salesPerfectBindingReducer,
  sales_folding: salesFoldingReducer,
  sales_cutting_sheet: salesCuttingSheetReducer,
  calendar: calendarReducer,
  sales_calendar: salesCalendarReducer,
  paper_bag: paperBagReducer,
  sales_paper_bag: salesPaperBagReducer,
  plastic_file: plasticFileBagReducer,
  sales_plastic_file: salesplasticFileReducer,
  envelope: envelopeBagReducer,
  sales_envelope: salesEnvelopeReducer,
  downloads_brochure: downloadsBrochureReducer,
  downloads_manuals: downloadsManualsReducer,
  outboards_category: OcReducer,
  find_dealer: FindDealerReducer,
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// const reducer = (state, action) => {
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
const makeStore: any = ({ isServer }: any) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
    // return createStore(rootReducer, bindMiddleware([]));
  } else {
    //If it's on client side, create a store which will persist

    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["counter", "kanyeQuote"],
    };

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store: any = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );
    store.__persistor = persistStore(store);
    return store;
  }
};

type Store = ReturnType<typeof makeStore>;
export type AppState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const wrapper = createWrapper<Store>(makeStore);
