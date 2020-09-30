import React from 'react';
import axios from 'axios';
import BooksList from './BooksList';



class Books extends React.Component {

  constructor(){
    super()
    this.books = []
    this.leftSide = []
    this.rightSide = []
    this.leftFlag = true
    this.rightFlag = false
  }

  state = {term:'',page:1,displayArray:[]}


  loadBooks = (query,page) => {
    const url = `http://openlibrary.org/search.json`
       axios.get(url,{
        params:{q:query,page:page}
      }).then(res =>{
        this.books = res.data.docs
        this.arraySplit()
        //this.setState({books:res.data.docs});     console.log(res.data)
        } )
        
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.loadBooks(this.state.term,this.state.page);
}

  loadMore = () => {
    this.setState(prevState =>({
      page:prevState.page+1,
    }))
    this.loadBooks(this.state.term,this.state.page);
    
  }
  scrollListener = window.addEventListener('scroll',()=>{
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
    console.log({scrollTop,scrollHeight,clientHeight})
    if(((scrollTop + clientHeight) >= scrollHeight - 500) && this.leftFlag){
      this.rightFlag = true;
      this.leftFlag = false;
      console.log(this.leftFlag)
      this.addRight()
      this.loadMore()
      
    }
    else if (((scrollTop + clientHeight) >= scrollHeight - 500) && this.rightFlag) {
      this.rightFlag = false;
      this.leftFlag = true;
      this.addLeft()
    }
    
  })




  arraySplit  = () => {

    this.leftSide = this.books.splice(0, 50);
    this.rightSide = this.books;
    this.books=[]
    if(this.state.displayArray.length === 0){
      this.addLeft()
    }
    //console.log(this.leftSide,this.rightSide)
  }

  addLeft = () => {
    let {displayArray} = this.state
    this.setState({displayArray:[...displayArray,...this.leftSide]})
    this.leftSide = []
    console.log(displayArray)
  }

  addRight = () => {
    let{displayArray} = this.state
    this.setState({displayArray:[...displayArray,...this.rightSide]})
    this.rightSide = []
    console.log(displayArray)
  }

  render(){
    return (
      <div className="container">
      <form onSubmit = {this.onFormSubmit}>
              <label>Book Search</label>
              <div>
              <input type="text" value={this.state.value} onChange = {e=>this.setState({term:e.target.value})}/>
              </div>
        </form>
        <ul>
          {this.state.displayArray.map(book => <div id = "list">
            <BooksList {...book}/>
          </div>)}
        </ul>
        {/* <button onClick={this.loadMore}>Load More</button> */}
    </div>)
  }
}

export default Books;