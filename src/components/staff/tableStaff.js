import { NavLink } from "react-router-dom";
const ListStaff = (props) => {
  const staffs = props.staffs;
  if (!staffs) {
    return <></>;
  }
  console.log(staffs);
  return (
    <div className="card card-table">
      <div className="card-body booking_card">
        <div className="table-responsive">
          <table className=" table table-stripped table table-hover table-center mb-0 text-center">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => {
                return (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td className="text-left">
                      <h2 className="table-avatar">
                        <div className="avatar avatar-sm mr-4">
                          <img
                            className="avatar-img rounded-circle"
                            src={
                              "/assets/img/" +
                              (staff.roles === "staff"
                                ? "staff.png"
                                : "manager.png")
                            }
                            alt="User Image"
                          />
                        </div>
                        <div style={{ fontSize: "large" }}>
                          {staff.fullName}
                        </div>
                      </h2>
                    </td>
                    <td>
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail={staff.email}
                      >
                        [email&#160;protected]
                      </a>
                    </td>
                    <td>{staff.telephoneNumber}</td>

                    <td>
                      <div className="actions">
                        <a
                          href="#"
                          className={
                            "btn btn-sm mr-2 " +
                            (staff.roles == "staff"
                              ? "bg-success-light"
                              : "bg-warning-light")
                          }
                        >
                          {staff.roles}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListStaff;
