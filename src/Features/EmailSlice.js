import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEMAILs = createAsyncThunk(
  "fetch/emails",
  async (data, { dispatch, getState, rejectWithValue }) => {
    if (data && data.cheat_used) {
      dispatch(setCheat());
    }
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
    usedCheat: false,
  },
  reducers: {
    readEmailAdded: (state, action) => {
      // you can write mutating logic in reducers thanks to Immer library
      if (state.activeBTN == "Unread") {
        state.readEmail.push(action.payload);
        localStorage.setItem("readEmail", JSON.stringify(state.readEmail));
        state.unreadEmail = state.unreadEmail.filter(
          (ele) => ele.id != action.payload.id
        );
        localStorage.setItem("unreadEmail", JSON.stringify(state.unreadEmail));
      }
    },
    favoriteEmailAdded: (state, action) => {
      console.log(`getting it`);
      // console.log(state.readEmail);
      state.activeEmail.isFavorite = true;
      state.readEmail = state.readEmail.map((ele) => {
        if (ele.id == action.payload.id) {
          ele.isFavorite = true;
        }
        return ele;
      });
      state.favoriteEmail = state.readEmail.filter((ele) => ele.isFavorite);
      localStorage.setItem(
        "favoriteEmail",
        JSON.stringify(state.favoriteEmail)
      );
    },
    unfavoriteEmail: (state, action) => {
      state.readEmail = state.readEmail.map((ele) => {
        if (ele.id == action.payload.id) {
          ele.isFavorite = false;
        }
        return ele;
      });
      state.favoriteEmail = state.favoriteEmail.filter(
        (ele) => ele.id != action.payload.id
      );
      state.activeEmail.isFavorite = false;
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
      state.limit = action.payload.MetaData.limit;
      state.total = action.payload.MetaData.total;
      state.currenPage = action.payload.MetaData.currenPage;
      state.totalPages = action.payload.MetaData.totalPages;
      state.hasMore = action.payload.MetaData.hasMore;
    },
    setActiveBTN: (state, action) => {
      state.activeBTN = action.payload;
    },
    setCheat: (state) => {
      state.cheat_used = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEMAILs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEMAILs.fulfilled, (state, action) => {
        state.status = "successful";
        state.unreadEmail.push(...action.payload.list);
        state.unreadEmail = state.unreadEmail.map((ele) => {
          ele.isFavorite = false;
          return ele;
        });
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
  unfavoriteEmail,
  closeEmail,
  setFROMLocalStorage,
  setActiveBTN,
  setCheat,
} = EmailSlice.actions;
