import React from "react";
import { useQuery, gql } from '@apollo/client';

const getBookQuery = gql`
	{
		books {
			name
			id
		}
	}
`
function BookList () {
	const { data, loading, error } = useQuery(getBookQuery)
	const displayBook = () => {
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error :(</p>;
		return data.books.map(book => {
			return (
			<li key={book.id}>{book.name}</li>
			)
		})
	};
	// render
	return (
		<div>
			<ul id="book-list">
				{displayBook()}
			</ul>
		</div>
	)
}

export default BookList;
