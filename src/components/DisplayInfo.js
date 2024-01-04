import React from "react";

class DisplayInfo extends React.Component {
  handleShowHide() {
    this.setState({
      isShowList: !this.state.isShowList,
    });
  }

  state = {
    isShowList: true,
  };

  render() {
    //destructuring array
    const { listUser } = this.props; //object
    //const listUser = this.props.listUser
    console.table(listUser);
    //props
    return (
      <div>
        <div>
          <span onClick={() => this.handleShowHide()}>
            {this.state.isShowList === true ? "Hide List:" : "Show List"}
          </span>
        </div>
        {this.state.isShowList && (
          <div>
            {listUser.map((user, index) => {
              console.log(user);

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
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfo;
