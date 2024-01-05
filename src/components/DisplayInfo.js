import React from "react";
import "./DisplayInfo.scss";
import image from "./../logo.svg";

class DisplayInfo extends React.Component {
  constructor(props) {
    console.log("contructor : 1");
    super(props);
    this.state = {
      isShowList: true,
    };
  }

  handleShowHide() {
    this.setState({
      isShowList: !this.state.isShowList,
    });
  }
  componentDidMount() {
    console.log("did mount");
    setTimeout(() => {
      document.title = "had change";
    }, 3000);
  }
  componentDidUpdate(preProps, preState, snapshot) {
    console.log("updated", this.props, preProps);
    if (this.props.listUser !== preProps.listUser) {
      if (this.props.listUser.length === 5) {
        console.log("u have 5 user");
      }
    }
  }

  render() {
    console.log("rendered");
    //destructuring array
    const { listUser } = this.props; //object
    //const listUser = this.props.listUser
    // console.table(listUser);
    //props
    return (
      <div className="display-info">
        <img src={image} />;
        <div>
          <span onClick={() => this.handleShowHide()}>
            {this.state.isShowList === true ? "Hide List:" : "Show List"}
          </span>
        </div>
        {this.state.isShowList && (
          <>
            {listUser.map((user, index) => {
              // console.log(user);

              //   if (+user.age > 18) {
              //     //+ = String-> number
              //     return (
              //       <div key={user.id} className="blue">
              //         <div>My name is {user.name}</div>
              //         <div>My age is {user.age}</div>
              //         <hr />
              //       </div>
              //     );
              //   } else {
              //     return (
              //       <div key={user.id} className="red">
              //         <div>My name is {user.name}</div>
              //         <div>My age is {user.age}</div>
              //         <hr />
              //       </div>
              //     );
              //   }

              return (
                <div key={user.id} className={+user.age > 30 ? "blue" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                  <button onClick={() => this.props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                  <hr />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default DisplayInfo;
