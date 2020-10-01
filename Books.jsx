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
    this.totalRecords = 0
    this.item = 0
    this.num = 0
  }

  state = {term:'',page:1,displayArray:[]}


  loadBooks = (query,page) => {
    const url = `http://openlibrary.org/search.json`
       axios.get(url,{
        params:{q:query,page:page}
      }).then(res =>{
        this.books = res.data.docs
        //console.log(this.books)
        this.totalRecords = res.data.numFound
        this.arraySplit()
        //this.setState({books:res.data.docs});     console.log(res.data)
        //console.log(res.data)
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

  let scrollPosition;
  let elementPosition;

    this.num = (this.state.displayArray.length) - 5;
    let element = document.getElementById(`${this.num}`);
    let elementHeight = element.clientHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    scrollPosition = scrollY + windowHeight;
    elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;
    
    
    

  //   if(element.getBoundingClientRect().top <= 0){
  //     console.log("TRIGGER: bottom of div reached.");
  // }
    // if(scrollPosition >= elementPosition){
    //   console.log('Success!!')
    // }
    // const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
    // console.log({scrollTop,scrollHeight,clientHeight})
    
    
    if(this.state.displayArray.length > this.totalRecords){
      return
    }

    else if( (scrollPosition >= elementPosition) && this.leftFlag){
      console.log(`Entered`)
      this.rightFlag = true;
      this.leftFlag = false;
      //console.log(this.leftFlag)
      this.addRight()
      this.loadMore()
    }
    

    else if ((scrollPosition >= elementPosition) && this.rightFlag) {
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
   // console.log(this.leftSide,this.rightSide)
  }

  addLeft = () => {
    let {displayArray} = this.state
    this.setState({displayArray:[...displayArray,...this.leftSide]})
    this.leftSide = []
    //this.num = (this.state.displayArray.length) - 5;
   // console.log(displayArray)
    
  }

  addRight = () => {
    let{displayArray} = this.state
    this.setState({displayArray:[...displayArray,...this.rightSide]})
    this.rightSide = []
    //this.num = (this.state.displayArray.length) - 5;
    //console.log(displayArray)
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
          {this.state.displayArray.map(book => <div className = "list" id = {`${this.item}`}>
            <BooksList  uni = {this.item = this.item + 1} {...book}/>
            {/* {console.log(`${this.item = this.item + 1}`)} */}
          </div>)}
        </ul>
        {/* <button onClick={this.loadMore}>Load More</button> */}
        
    </div>)
  }
}

export default Books;