import React from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  state = {
    searchTerm: ''
  };
  /* To use in a parent comp: 
    in App.js ->
    setSearchTerm = (searchTerm) => {
        this.setState({ searchTerm });
    };
    <SearchBar doSearch={this.setSearchTerm} />
  
  */
  doSearch = debounce(() => {
      console.log(this.state.searchTerm);
      this.props.doSearch(this.state.searchTerm);
  }, 300);

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSearch();
    });
  };

  render() {
    return (
      <input
        value={this.state.searchTerm}
        type="search"
        onChange={this.handleSearch}
      />
    );
  }
}
export default SearchBar;
