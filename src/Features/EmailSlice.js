import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEMAILs = createAsyncThunk(
  "fetch/emails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://flipkart-email-mock.vercel.app/?page=${
          getState().email.currenPage + 1
        }`
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(`Failed to fetch Emails Data`);
      }
      return resData;
    } catch (err) {
      rejectWithValue({ message: err.message });
    }
  }
);

export const fetchSpecificEMAIL = createAsyncThunk(
  "fetch/SpecificEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${data.id}`
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(`Failed to fetch Email Data`);
      }
      return { resData, data };
    } catch (err) {
      rejectWithValue({ message: err.message });
    }
  }
);

const EmailSlice = createSlice({
  name: "EmailSlice",
  initialState: {
    activeBTN: "Unread",
    status: "idle", //  loading ,  successful , error
    error: null,
    unreadEmail: [],
    readEmail: [],
    favoriteEmail: [],
    activeEmail: null,
    hasMore: true,
    // currentPage < totalPages
    totalPages: 2,
    currenPage: 0,
    total: 0,
    limit: 0,
  },
  reducers: {
    readEmailAdded: (state, action) => {
      // you can write mutating logic in reducers thanks to Immer library
      state.readEmail.push(action.payload);
      localStorage.setItem("readEmail", JSON.stringify(state.readEmail));
      state.unreadEmail = state.unreadEmail.filter(
        (ele) => ele.id != action.payload.id
      );
      localStorage.setItem("unreadEmail", JSON.stringify(state.unreadEmail));
    },
    favoriteEmailAdded: (state, action) => {
      state.favoriteEmail.push(action.payload);
      localStorage.setItem(
        "favoriteEmail",
        JSON.stringify(state.favoriteEmail)
      );
    },
    unfavoriteEmailAdded: (state, action) => {
      state.favoriteEmail = state.favoriteEmail.filter(
        (ele) => ele.id != action.payload.id
      );
      localStorage.setItem(
        "favoriteEmail",
        JSON.stringify(state.favoriteEmail)
      );
    },
    closeEmail: (state) => {
      state.activeEmail = null;
    },
    setFROMLocalStorage: (state, action) => {
      state.readEmail = action.payload.readEmail;
      state.unreadEmail = action.payload.unreadEmail;
      state.favoriteEmail = action.payload.favoriteEmail;
    },
    setActiveBTN: (state, action) => {
      state.activeBTN = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEMAILs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEMAILs.fulfilled, (state, action) => {
        state.status = "successful";
        state.unreadEmail = action.payload.list;
        state.currenPage = state.currenPage + 1;
        state.hasMore = state.currenPage < state.totalPages;
        // storing unreadEmail each time a new page was fetched
        localStorage.setItem("unreadEmail", JSON.stringify(state.unreadEmail));
        if (state.total == 0) {
          state.total = action.payload.total;
          state.limit = action.payload.list.length;
        }
        // storing Meta each time a new page was fetched
        localStorage.setItem(
          "MetaData",
          JSON.stringify({
            limit: state.limit,
            total: state.total,
            currenPage: state.currenPage,
            totalPages: state.totalPages,
            hasMore: state.currenPage < state.totalPages,
          })
        );
      })
      .addCase(fetchEMAILs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(fetchSpecificEMAIL.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificEMAIL.fulfilled, (state, action) => {
        state.status = "successful";
        state.activeEmail = {
          ...action.payload.resData,
          ...action.payload.data,
        };
      })
      .addCase(fetchSpecificEMAIL.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default EmailSlice;

export const {
  readEmailAdded,
  favoriteEmailAdded,
  closeEmail,
  setFROMLocalStorage,
  setActiveBTN,
} = EmailSlice.actions;
