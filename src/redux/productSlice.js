import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async fetch dei prodotti
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (dataUrl) => {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error('Errore nel fetch!');
    const data = await response.json();
    // se ci sono prodotti in localStorage (aggiunti da admin), usali
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    return stored.length ? stored : data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      // persisti su localStorage
      localStorage.setItem('products', JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
