import axios from 'axios';
import { useState } from 'react';
import './App.css';
import BookForm from './BookForm';
import { Button } from '@mui/material';



const BookData = (props) => {



    const [toggleState, setToggleState] = useState(false);


    const toggleFunc = (val) => {
        setToggleState(val);

    }

    let publishedDates = [];

    props.bookData.forEach(ele => {
        publishedDates.push(ele.createdAt.split('T')[0]);
    });


    const [bookState, setBookState] = useState({ id: '' });




    const populateBookData = (id) => {

        toggleFunc(true);
        setBookState({ id: id })

    }



    const handleBookDelete = async (id) => {

        await axios.delete(
            `https://6240b0909b450ae2743749f4.mockapi.io/Books/${id}`
        );
        props.fetchData()

    }




    return (
        <>
            <div className='libraryContainer'>

                <div className='libraryData'>
                    <h2> Library Data </h2>


                    <table border={1}>
                        <thead>
                            <tr>
                                <td> Id </td>
                                <td> Book </td>
                                <td> Author </td>
                                <td> subject </td>
                                <td> Published </td>
                                <td> Actions </td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.bookData.map((data, i) => (
                                <tr key={data.id}>
                                    <td> {data.id} </td>
                                    <td> {data.bookName} </td>
                                    <td> {data.author} </td>
                                    <td> {data.subject} </td>
                                    <td> {publishedDates[i]} </td>
                                    <td>
                                        <Button color='success' onClick={() => populateBookData(data.id)}>

                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button color='warning' onClick={() => handleBookDelete(data.id)}>

                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='libraryForm'>

                    <div className='formHead'>
                        <h2>Add Book Form</h2>
                    </div>
                    <div>
                        <Button variant='contained'
                            color='primary'
                            onClick={() => { setToggleState(true) }}> Create Book Data </Button>
                    </div>

                    <div>
                        {(toggleState) ?
                            <>
                                <BookForm bookData={props.bookData}
                                    fetchData={props.fetchData}
                                    toggleFunc={toggleFunc}
                                    updateId={bookState.id}
                                />

                            </> :
                            <></>}
                    </div>
                </div>
            </div>
        </>
    )
}


export default BookData;