import { useEffect, useState } from "react";

const ListUser = (props) => {
  const { listuser } = props; //const listuser = props.lisuser

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listuser &&
            listuser.length > 0 &&
            listuser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => props.handleView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => props.handleBtnUpdateUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listuser && listuser.length === 0 && (
            <tr>
              <td colSpan={"5"}>Not Fount Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default ListUser;
