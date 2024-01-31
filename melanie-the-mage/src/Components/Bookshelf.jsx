import Book from './Book';
import style from '../assets/style/stylesheet.module.css';
import { useState, useEffect } from 'react';
import AddBook from './AddBook';
import inventory from '../assets/Bookshelf/books';
import upArrow from '../assets/images/upArrow.png';
import downArrow from '../assets/images/downArrow.png';
import { headers } from '../assets/Bookshelf/headers';

const Bookshelf = () => {

    const [sort, setSort] = useState({keyToSort: 'title'});
    const [ascending, isAscending] = useState(true);
    const [books, setBooks] = useState(inventory);

    const sortedBookshelf = (books) => {
        // this was the other part to edit
        const sortedBooks = [...books]
        if(!ascending) {
            return sortedBooks.sort((a,b) => (a[sort.keyToSort].toUpperCase() < b[sort.keyToSort].toUpperCase()) ? 1 : -1)        
        }
        return sortedBooks.sort((a,b) => (a[sort.keyToSort].toUpperCase() < b[sort.keyToSort].toUpperCase()) ? -1 : 1)

        // return books;
    }

    const handleDeletedBook = (deletedBookId) => {
        // filter all the books that are not that book 
        const updatedBooks = books.filter((book) => book.id !== deletedBookId)
        setBooks(updatedBooks)
        // return null;
    }

    const handleEditedBook = (editedBook) => {
        // filtering through for the edited book (if it has the same id as the edited book)
        let remainingBooks = books.filter(book => book.id !== editedBook.id);
        setBooks([...remainingBooks, editedBook])
        // return null;
    }

    const handleAddedBook = (newBook) => {
        // return null;
        setBooks([...books, newBook]);
    }

    const handleSort = (header) => {
        isAscending(!ascending);
        setSort({keyToSort: header.key})
    }

    useEffect(() => {
        setBooks(books);
    },[books]);

    return (
        <div>
            <div className={style.add_book_container}>
                    <AddBook onSubmit={handleAddedBook}/>
            </div>
            <div className={style.bookshelf_container}>
                <h2 className={style.font}>Books From Bookshelf</h2>
            <div className={style.table}>
                <div className={style.head}>
                    <div className={style.head_row}>
                        {headers.map((header, index) => 
                        <div key={index} className={style.head_row_item}>
                            
                            <button 
                                className={style.sort_button}
                                onClick={(() => {handleSort(header)})}>
                                    <div>{header.label}</div>
                                    <div>
                                        {header.key === sort.keyToSort && (
                                            <span className={style.sort_icon}>
                                                {sort.keyToSort === header.key && 
                                                ascending ? (
                                                    <img src={upArrow}/>
                                                ) : (
                                                    <img src={downArrow}/>
                                                )}
                                            </span>
                                        )}
                                   </div>
                                </button>
                        </div>
                        )}
                    </div>
                </div>
                <div className={style.body}>
                    { sortedBookshelf(books).map((book, index) => (
                            <Book 
                                key={index} 
                                book={book}
                                submitDelete={handleDeletedBook} 
                                submitEdit={handleEditedBook}
                            />
                        ))}
                </div>
            </div>
            </div>
        </div>
    )
}
    
export default Bookshelf;