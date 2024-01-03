//class component
//function component
import React from "react";

class MyComponent extends React.Component {
  //JSX - chi chua dc 1 parent element
  render() {
    return (
      <div>
        Hello {this.state.name} and im {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>Hover</button>
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click
        </button>
      </div>
    );
  }
  state = {
    name: "A",
    add: "ha noi",
    age: 25,
  };
  handleClick(event) {
    // console.log(event.target);
    // console.log(this.state.name);
    this.setState({
      name: "Ban",
    });
    this.setState({
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnMouseOver(event) {
    console.log(event.pageX);
  }
}

export default MyComponent;
