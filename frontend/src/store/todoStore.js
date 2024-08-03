import { create } from "zustand";
import {
  getTodoList,
  createTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
} from "../api/todoApi";

const useTodoStore = create((set) => ({
  events: [],
  filteredEvents: [],
  setFilteredEvents: (evts) => {
    set(() => ({ filteredEvents: evts }));
  },
  fetchEvents: async () => {
    const events = await getTodoList();
    if (events) {
      set({
        events,
      });
      return true;
    } else {
      alert("getList 에러");
      return false;
    }
  },

  addEvent: async (newTodo) => {
    const event = await createTodoRequest(newTodo);
    if (event) {
      set((state) => ({
        events: [...state.events, event],
      }));
      return true;
    } else {
      alert("add 에러");
      return false;
    }
  },

  deleteEvent: async (id) => {
    const rst = await deleteTodoRequest(id);
    if (rst) {
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
      }));
      return true;
    } else {
      alert("delete 에러");
      return false;
    }
  },

  updateEvent: async (todoItem) => {
    const rst = await updateTodoRequest(todoItem);
    if (rst) {
      set((state) => ({
        events: state.events.map((event) =>
          event.id === todoItem?.id ? todoItem : event
        ),
      }));
      return true;
    } else {
      alert("update 에러");
      return false;
    }
  },
}));
export default useTodoStore;
