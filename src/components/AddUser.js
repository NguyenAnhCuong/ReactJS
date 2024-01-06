import React, { useState } from "react";

// class AddUser extends React.Component {
//   state = {
//     name: "Alexander",
//     add: "ha noi",
//     age: 25,
//   };
//   handleOnSubmit(event) {
//     event.preventDefault();
//     this.props.handleAddUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   }
// handleOnChange(event) {
//   this.setState({
//     name: event.target.value,
//   });
//   // console.log(event, event.target.value);
// }
// handleOnChangeAge(event) {
//   this.setState({
//     age: event.target.value,
//   });
//   // console.log(event, event.target.value);
// }
//   // handleClick(event) {
//   //   // console.log(event.target);
//   //   // console.log(this.state.name);
//   //   this.setState({
//   //     name: "Ban",
//   //   });
//   //   this.setState({
//   //     age: Math.floor(Math.random() * 100 + 1),
//   //   });
//   // }
//   // handleOnMouseOver(event) {
//   //   console.log(event.pageX);
//   // }

//   render() {
//     return (
// <div>
//   Hello {this.state.name} and im {this.state.age}
//   {/* <button onMouseOver={this.handleOnMouseOver}>Hover</button> */}
//   <button
//     onClick={(event) => {
//       this.handleClick(event);
//     }}
//   >
//     Click
//   </button>
//   <form onSubmit={(event) => this.handleOnSubmit(event)}>
//     <label>Name:</label>
//     <input
//       value={this.state.name}
//       type="text"
//       onChange={(event) => this.handleOnChange(event)}
//     ></input>

//     <label>Age:</label>
//     <input
//       value={this.state.age}
//       type="text"
//       onChange={(event) => this.handleOnChangeAge(event)}
//     ></input>
//     <button>submit</button>
//   </form>
// </div>
//     );
//   }
// }

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [age, setAge] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      Hello {name} and im {age}
      {/* <button onMouseOver={this.handleOnMouseOver}>Hover</button> */}
      <button
        onClick={(event) => {
          this.handleClick(event);
        }}
      >
        Click
      </button>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Name:</label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnChangeName(event)}
        ></input>

        <label>Age:</label>
        <input
          value={age}
          type="text"
          onChange={(event) => handleOnChangeAge(event)}
        ></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddUser;
