import { NavLink } from "react-router-dom";
const ListStaff = (props) => {
  const Staffs = props.staffs;
  if (!Staffs) {
    return <></>;
  }
  return (
    <div className="card card-table">
      <div className="card-body booking_card">
        <div className="table-responsive">
          <table className=" table table-stripped table table-hover table-center mb-0 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Staff ID</th>
                <th>Email</th>
                <th>Ph.Number</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {Staffs.map((staff) => {
                return (
                  <tr key={staff.id}>
                    <td className="text-left">
                      <h2 className="table-avatar">
                        <div className="avatar avatar-sm mr-4">
                          <img
                            className="avatar-img rounded-circle"
                            src={
                              "assets/img/profiles/" +
                              (staff.role == "staff"
                                ? "staff.png"
                                : "manager.png")
                            }
                            alt="User Image"
                          />
                        </div>
                        <div style="font-size: large;">{staff.name}</div>
                      </h2>
                    </td>
                    <td>ST-001</td>
                    <td>
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail={staff.email}
                      >
                        [email&#160;protected]
                      </a>
                    </td>
                    <td>631-254-6480</td>
                    <td>21-04-2020</td>
                    <td>
                      <div className="actions">
                        {" "}
                        <a
                          href="#"
                          className={
                            "btn btn-sm mr-2 " +
                            (staff.roll == "staff"
                              ? "bg-success-light"
                              : "bg-warning-light")
                          }
                        >
                          {staff.role}
                        </a>
                      </div>
                    </td>

                    <td className="text-right">
                      <div className="dropdown dropdown-action">
                        {" "}
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v ellipse_color"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          {" "}
                          <a className="dropdown-item" href="edit-staff.html">
                            <i className="fas fa-pencil-alt m-r-5"></i> Edit
                          </a>{" "}
                          <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_asset"
                          >
                            <i className="fa-solid fa-user-xmark"></i>
                            Deactivate
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListStaff;
