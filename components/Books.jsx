import React from 'react';
import axios from 'axios';
import BooksList from './BooksList';



class Books extends React.Component {

  state = {books:[],term:'',page:1}


  loadBooks = (query,page) => {
    const {books} = this.state;
    const url = `http://openlibrary.org/search.json`
       axios.get(url,{
        params:{q:query,page:page}
      }).then(res =>{
        this.setState({books:[...books,...res.data.docs] });
        console.log(res.data)} )
        
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.loadBooks(this.state.term,this.state.page);
}

  loadMore = () => {
    this.setState(prevState =>({
      page:prevState.page+1,
      scrolling: true
    }))
    this.loadBooks(this.state.term,this.state.page);
    
  }

  componentWillMount(){
    this.scrollListener = window.addEventListener('scroll',()=>{
      const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
      if((scrollTop + clientHeight) >= scrollHeight - 2){
        this.loadMore()
      }
      
    })
  }


  render(){
    return (
      <div className="books">
      <form onSubmit = {this.onFormSubmit}>
              <label>Book Search</label>
              <div>
              <input type="text" value={this.state.value} onChange = {e=>this.setState({term:e.target.value})}/>
              </div>
        </form>
        <ul>
          {this.state.books.map(book => <li>
            <BooksList {...book}/>
          </li>)}
        </ul>
        {/* <button onClick={this.loadMore}>Load More</button> */}
    </div>)
  }
}

export default Books;