//class component
//function component
import React, { useState } from "react";
import AddUser from "./AddUser";
import DisplayInfo from "./DisplayInfo";

// class MyComponent extends React.Component {
//   //JSX - chi chua dc 1 parent element
//   state = {
//     listUser: [
//       { id: 1, name: "alisia", age: "46" },
//       { id: 2, name: "belic", age: "34" },
//       { id: 3, name: "vivian", age: "21" },
//     ],
//   };
//   handleAddUser = (userInfo) => {
//     this.setState({
//       listUser: [userInfo, ...this.state.listUser],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     let listUserClone = this.state.listUser;
//     listUserClone = listUserClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUser: listUserClone,
//     });
//   };

//   render() {
//     //DRY: dont repeat yourself

//     const test = "hello everyone";
//     // const test = { name: "aksiwa", age: 15 };
//     return (
// <>
//   {test}
//   {/* {JSON.stringify(test)} */}
//   <br />
//   <div className="a">
//     <AddUser handleAddUser={this.handleAddUser}></AddUser>
//     <hr />
//     <DisplayInfo
//       listUser={this.state.listUser}
//       handleDeleteUser={this.handleDeleteUser}
//     ></DisplayInfo>
//   </div>
//   <div className="b"></div>
// </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "alisia", age: "46" },
    { id: 2, name: "belic", age: "34" },
    { id: 3, name: "vivian", age: "21" },
  ]);

  const handleAddUser = (userInfo) => {
    setListUser([userInfo, ...listUser]);
  };

  const handleDeleteUser = (userId) => {
    let listUserClone = listUser;
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    setListUser(listUserClone);
  };

  return (
    <>
      <div className="a">
        <AddUser handleAddUser={handleAddUser}></AddUser>
        <hr />
        <DisplayInfo
          listUser={listUser}
          handleDeleteUser={handleDeleteUser}
        ></DisplayInfo>
      </div>
      <div className="b"></div>
    </>
  );
};

export default MyComponent;
