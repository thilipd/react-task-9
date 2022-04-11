import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BookData from './BookData';


// import StudentForm from './StudentForm';
// import TeacherForm from './TeacherForm';


const Home = () => {


    let [state, setState] = useState({
        bookData: [],

    });
    const fetchData = async () => {

        const response = await axios.get('https://6240b0909b450ae2743749f4.mockapi.io/Books');

        await setState({
            bookData: [...response.data]
        });
    }



    useEffect(() => {
        const data = async () => {

            const response = await axios.get('https://6240b0909b450ae2743749f4.mockapi.io/Books');

            await setState({
                bookData: [...response.data]
            });
        }
        data()
    }, []);


    return (
        <>
            {(state.bookData.length) ?
                <BookData bookData={state.bookData} fetchData={fetchData} /> :
                <></>}
        </>
    )
}


export default Home;


