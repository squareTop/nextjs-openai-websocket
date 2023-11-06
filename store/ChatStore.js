import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// initial chat store
export const ChatStore = create(
  // persist(
  (set, get) => ({
    ws: null,
    // default array chats
    chats: [],
    // default loading false
    chat: {},
    loading: false,
    setWS: _ws => {
      console.log(get().ws)
      get().ws?.close()
      set(() => ({ ws: _ws }))
    },
    setLoading: _loading => set(() => ({ loading: _loading })),
    // store chat to api
    setLastChat: async (chat) => {
      try {
        set((state) => ({ chat }));
      } catch (err) {
        // toast error
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    },
    addChat: async (chatResponse) => {
      try {
        set((state) => ({
          chats: [...state.chats, {
            ...chatResponse,
            date: new Date(),
          }],
        }));
      } catch (err) {
        // toast error
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    },
    removeLastChat: async () => {
      try {
        set((state) => {
          let res = [...state.chats]
          res.pop()
          return {
            chats: res
          }
        })
      } catch (error) {
        // toast error
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    },
    // remove one chat
    removeOneChat: (item) => {
      // toast success
      toast.success(`Success delete ${item.chat}`);
      // remove one chat by index
      set((state) => ({
        chats: state.chats.filter((x) => x !== item),
      }));
    },
    // remove all chats
    removeAllChat: () => {
      // toast success
      toast.success(`Success delete all chats`);
      set({ chats: [] });
    },
  }),
  //   // set local storage
  //   {
  //     name: "next-openai-chats",
  //     storage: createJSONStorage(() => localStorage),
  //   }
  // )
);
