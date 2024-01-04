//class component
//function component
import React from "react";
import AddUser from "./AddUser";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  //JSX - chi chua dc 1 parent element
  state = {
    listUser: [
      { id: 1, name: "alisia", age: "46" },
      { id: 2, name: "belic", age: "34" },
      { id: 3, name: "vivian", age: "21" },
    ],
  };
  handleAddUser = (userInfo) => {
    this.setState({
      listUser: [userInfo, ...this.state.listUser],
    });
  };

  render() {
    //DRY: dont repeat yourself
    return (
      <div>
        <AddUser handleAddUser={this.handleAddUser}></AddUser>
        <hr />
        <DisplayInfo listUser={this.state.listUser}></DisplayInfo>
      </div>
    );
  }
}

export default MyComponent;
