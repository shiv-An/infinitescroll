import React from 'react';
import './style.css'


const BooksList = (props) => <div>
    <div className ="ui message container" key = {props.key}><div>Title : {props.title} </div> <div>Authour : {props.author_name} </div> year :{props.first_publish_year}</div>

</div>

export default BooksList;