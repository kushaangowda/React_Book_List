import React, { createContext, useReducer, useEffect } from "react";
import { parse } from "uuid";
import { BookReducer } from "../reducers/BookReducer";

export const BookContext = createContext();

const BookContextProvider = (props) => {
	const [books, dispatch] = useReducer(BookReducer, [], () => {
		const localData = localStorage.getItem("books");
		return localData ? JSON.parse(localData) : [];
	});

	// 2nd argument is initial value of state or books
	// 3rd argument if specified, is a function which returns initial value of state

	useEffect(() => {
		localStorage.setItem("books", JSON.stringify(books));
	}, [books]);

	return (
		<BookContext.Provider value={{ books, dispatch }}>
			{props.children}
		</BookContext.Provider>
	);
};

export default BookContextProvider;
