import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ListUserPaginate = (props) => {
  const { listuser, pageCount } = props; //const listuser = props.lisuser

  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    props.fetchListUserPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
  };

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
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageLinkClassName="page-link"
          pageClassName="page-item"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default ListUserPaginate;
