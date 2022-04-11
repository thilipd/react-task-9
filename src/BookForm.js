import { Button } from '@mui/material';
import axios from 'axios';
import { Formik } from "formik";
import './App.css';





const BookForm = (props) => {



    let initialValues = {
        books: [...props.bookData],
        bookName: '',
        author: '',
        subject: '',
        published: ''
    }


    if (props.updateId !== '') {
        let selectedBookData = props.bookData.filter((data) => data.id === props.updateId)[0];


        initialValues = {
            students: [...props.bookData],
            bookName: selectedBookData.bookName,
            author: selectedBookData.author,
            subject: selectedBookData.subject,
            published: selectedBookData.createdAt.split('T')[0],
        }


    }
    console.log(initialValues)
    const handleBookCreate = async (formData) => {

        var response = await axios.post(
            'https://6240b0909b450ae2743749f4.mockapi.io/Books',
            {

                bookName: formData.bookName,
                author: formData.author,
                subject: formData.subject,


            });
        props.bookData.push(response.data);
        props.fetchData()
    }


    let validate = (formData) => {
        var errors = {};
        if (formData.bookName === '') errors.bookName = 'Name is required';
        if (formData.author === '') errors.author = 'Authoris required';
        if (formData.subject === '') errors.subject = 'Subject is required';



        return errors;
    }

    const handleBookUpdate = async (id, formData) => {

        var response = await axios.put(
            `https://6240b0909b450ae2743749f4.mockapi.io/Books/${id}`,
            {
                bookName: formData.bookName,
                author: formData.author,
                subject: formData.subject,

            }
        );
        let index = props.bookData.findIndex(
            (user) => user.id === response.data.id
        )[0];

        props.bookData[index] = response.data;
        props.fetchData();

    }


    const handleSubmit = (formData) => {

        props.toggleFunc(false);


        if (props.updateId !== '') {
            handleBookUpdate(props.updateId, formData)
        } else {
            handleBookCreate(formData)
        }

        props.updateId = '';


    }

    return (
        <>

            {<div className="formContainer">

                <hr />

                <Formik

                    initialValues={initialValues}
                    validate={(formData) => validate(formData)}
                    onSubmit={(formData) => handleSubmit(formData)}

                >

                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label> Book Name: </label>
                                <input
                                    type="text"
                                    name="bookName"
                                    value={values.bookName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.bookName && errors.bookName}
                                </span>
                            </div>
                            <br />
                            <div>
                                <label> Author: </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={values.author}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.author && errors.author}
                                </span>
                            </div>
                            <br />
                            <div>
                                <label> Subject: </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.subject && errors.subject}
                                </span>
                            </div>
                            <br />


                            <br />
                            <div className="formBtn">
                                <Button variant="contained" type="submit"> Submit </Button> &nbsp;
                                <Button variant="contained" type="button"> Reset </Button> &nbsp;
                            </div>
                        </form>
                    )}
                </Formik>
            </div >}
        </>
    )
}


export default BookForm;