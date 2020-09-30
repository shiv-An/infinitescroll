import React from 'react';
import axios from 'axios';
import BookSearch from './BookSearch';
import BooksList from './BooksList';



class App extends React.Component {

  state = { books:[],page:1};

    onSearchSubmit = async (query) => {
      const{ books,page} = this.state
      const url = `http://openlibrary.org/search.json`
      const response = await axios.get(url,{
        params:{q:query,page:page}
      });

      this.setState({books:[...books,...response.data.docs]});
      console.log(this.state.books)
  }

  loadMore = ()=>{
    this.setState(prevState=>({
      page:prevState.page+1
    }),this.onSearchSubmit(this.props.query))
  }
  

  render(){
    return (
      <div>
       <BookSearch onSubmit = {this.onSearchSubmit} />
       <BooksList books = {this.state.books}/>
       <button onClick={this.loadMore}>LoadMore</button>
    </div>)
  }
}

export default App;

