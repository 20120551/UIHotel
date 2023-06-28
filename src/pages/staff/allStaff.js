import ListStaff from "@components/staff/tableStaff";
import { useEffect, useState } from "react";
import { staffService } from "@services/index";
import { NavLink } from "react-router-dom";
export default function AllStaffs() {
  return (
    <>
      <Header />
      <SearchBar />
      <StaffList />
    </>
  );
}

function Header() {
  return (
    <div className="page-header mt-5">
      <div className="row align-items-center">
        <div className="col">
          <div className="mt-5">
            <h4 className="card-title float-left mt-2">All Staff</h4>{" "}
            <a
              href="add-staff.html"
              className="btn btn-primary float-right veiwbutton"
            >
              Add Staff
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="row">
      <div className="col-lg-12">
        <form>
          <div className="row formtype">
            <div className="col-md-5">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search staff..."
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <select className="form-control" id="sel1" name="sellist1">
                  <option>Search option</option>
                  <option>Staff ID</option>
                  <option>Staff Name</option>
                  <option>Phone number</option>
                  <option>Email</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <a
                  href="#"
                  className="btn btn-success btn-block mt-0 search_button"
                >
                  {" "}
                  Search
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function StaffList() {
  const [staffs, setStaffs] = useState([]);
  const [index, setIndex] = useState(1);
  const [end, setEnd] = useState(1);

  useEffect(() => {
    staffService.GetAllStaffs({ page: index, pageSize: 5 }).then((data) => {
      setStaffs(data.values);
      setEnd(data.totalPage);
    });
  }, [index]);

  return (
    <div className="row">
      <div className="col-sm-12">
        <ListStaff staffs={staffs} />
        <nav aria-label="..." className="mt-3 float-right">
          <ul className="pagination">
            <li
              className={"page-item " + (index === 1 ? "disabled" : "")}
              onClick={() => setIndex(index === 1 ? index : index - 1)}
            >
              <span className="page-link">Previous</span>
            </li>
            {[...Array(end)].map((x, i) => {
              if (i + 1 === index) {
                return (
                  <li key={i + 1} className="page-item active">
                    <a className="page-link" href="#">
                      {i + 1}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={i + 1} className="page-item">
                    <a className="page-link" href="#">
                      {i + 1}
                    </a>
                  </li>
                );
              }
            })}
            <li
              className={"page-item " + (index === end ? "disabled" : "")}
              onClick={() => setIndex(index === end ? index : index + 1)}
            >
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
