import React from "react";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      list: null
    };

    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    let author = this.state.author;
    fetch("https://jsonmock.hackerrank.com/api/articles?author=" + author + "&page=1")
      .then(res => res.json())
      .then(
        (result) => {
          result.data.length > 0 ? (
            this.setState({list: result.data})
          ) : (
            this.setState({list: null})
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
          });
        }
      );
  }

  render() {
    console.log(this.state.list);
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input type="text" className="text-input" data-testid="text-input" onChange={event => this.setState({author: event.target.value})}/>
            <button className="fetch-button" data-testid="fetch-button" onClick={this.fetch}>Fetch</button>
          </div>
        </div>
        <div className="results">
          {
            this.state.list ? (

                <ul>
                  {
                    this.state.list.map((book, key) =>
                      <li key={key}>title: {book.title}  Author:{book.author} </li>
                    )
                  }
                </ul>

            ) : (
              <div data-testid="no-results">No results</div>
            )
          }
        </div>


      </React.Fragment>
    );
  }
}

export default Articles;
