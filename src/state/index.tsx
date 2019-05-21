import React, { createContext, useContext, useReducer, useState } from 'react'

export const StateContext = createContext({})

type Reducer<S, A> = (prevState: S, action: A) => S;

interface Received {
   reducer: Reducer<any, any>,
   initialState: Object,
   children: any
}

export const StateProvider = ({ reducer, initialState, children }: Received) => (
   <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
   </StateContext.Provider>
)

export const useGlobal = () => useContext(StateContext)

function useLocalStorage(key: string, initialValue: any) {
   // State to store our value
   // Pass initial state function to useState so logic is only executed once
   const [storedValue, setStoredValue] = useState(() => {
      try {
         // Get from local storage by key
         const item = window.localStorage.getItem(key);
         // Parse stored json or if none return initialValue
         return item ? JSON.parse(item) : initialValue;
      } catch (error) {
         // If error also return initialValue
         console.log(error);
         return initialValue;
      }
   });

   // Return a wrapped version of useState's setter function that ...
   // ... persists the new value to localStorage.
   const setValue = (value: any) => {
      try {
         // Allow value to be a function so we have same API as useState
         const valueToStore =
            value instanceof Function ? value(storedValue) : value;
         // Save state
         setStoredValue(valueToStore);
         // Save to local storage
         window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
         // A more advanced implementation would handle the error case
         console.log(error);
      }
   };

   return [storedValue, setValue];
}