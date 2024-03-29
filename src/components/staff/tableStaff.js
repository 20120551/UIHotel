import { Link } from "react-router-dom";
import { staffService } from "@services/index";
const ListStaff = (props) => {
  const staffs = props.staffs;
  const handelDelete = async (id) => {
    //  e.preventDefault();
    let warning = `Are you sure deactive account id ${id}`;
    if (confirm(warning) != true) {
      return;
    }
    await staffService
      .deleteStaff(id)
      .then(() => {
        alert(`Successfully deactive account id ${id}`);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
                        <div className="dropdown-menu dropdown-menu-right ">
                          {" "}
                          <Link
                            to={"/hotel/staff/edit-staff/" + staff.id}
                            className="dropdown-item"
                          >
                            <i className="fas fa-pencil-alt m-r-5"></i> Edit
                          </Link>
                          <div
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_asset"
                            onClick={async (e) => {
                              await handelDelete(staff.id);
                            }}
                          >
                            <i className="bi bi-trash m-r-5"></i>
                            Remove
                          </div>
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
