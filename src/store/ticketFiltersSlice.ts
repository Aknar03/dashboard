import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketStatus, TicketPriority } from '../API/types'; // Импортируем типы

type SortField = 'priority' | 'lastUpdated' | 'status' | 'assignedAgent' | 'subject';
type SortDirection = 'asc' | 'desc';

interface FiltersState {
  status: TicketStatus[];
  priority: TicketPriority[];
  sort: {
    field: SortField;
    direction: SortDirection;
  };
}

const initialState: FiltersState = {
  status: [],
  priority: [],
  sort: {
    field: 'lastUpdated',
    direction: 'desc',
  },
};

const ticketFiltersSlice = createSlice({
  name: 'ticketFilters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<TicketStatus[]>) {
      if (state.status !== action.payload) {
        state.status = action.payload;
      }
    },
    setPriorityFilter(state, action: PayloadAction<TicketPriority[]>) {
      if (state.priority !== action.payload) {
        state.priority = action.payload;
      }
    },
    setSort(state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) {

      if (
        state.sort.field === action.payload.field &&
        state.sort.direction === action.payload.direction
      ) {
        return state; 
      }
      state.sort = action.payload;
    },
  },
});


export const { setStatusFilter, setPriorityFilter, setSort } = ticketFiltersSlice.actions;
export default ticketFiltersSlice.reducer;
