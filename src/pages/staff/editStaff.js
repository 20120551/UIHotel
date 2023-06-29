import { useEffect, useState } from "react";
import { staffService } from "@services/index";
import { useNavigate, useParams } from "react-router-dom";
export default function EditStaff() {
  return (
    <>
      <MainForm />
    </>
  );
}

function InfomationForm(props) {
  const staff = props.staff;
  if (!staff) {
    return <></>;
  }
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title mt-5">Staff information</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex justify-content align-items ">
          <div className="col-lg-9">
            <form>
              <div className="row formtype">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      id="fullname"
                      className="form-control"
                      type="text"
                      defaultValue={staff.fullname}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      id="phone"
                      className="form-control"
                      type="text"
                      defaultValue={staff.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      id="email"
                      className="form-control"
                      type="text"
                      defaultValue={staff.email}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={staff.role}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 h-100 w-100 d-flex justify-content-center align-items-center">
            <div
              id="preview"
              className="d-flex justify-content-center align-items-center"
            >
              <img
                id="avatar"
                src={
                  "/assets/img/" +
                  (staff.role.toLowerCase() === "staff"
                    ? "staff.png"
                    : "manager.png")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function MainForm() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [staff, setStaff] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [pwdDisplayType, setPwdDisplayType] = useState("password");
  const [pwdValid, setPwdValid] = useState(undefined);
  const { id } = useParams();
  useState(() => {
    staffService.getStaffInfo(id).then((staff) => {
      setStaff({
        fullname: staff.fullName,
        phoneNumber: staff.telephoneNumber,
        email: staff.email,
        role: staff.roles,
      });
      setusername(staff.username);
    });
  }, [newPassword]);

  const handleSubmit = async (event) => {
    if (newPassword.length < 6) {
      event.preventDefault();
      setPwdValid(false);
    } else {
      await staffService
        .changePassWord(id, newPassword)
        .then(() => {
          alert("Password successfully changed");
          setNewPassword("");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handelDelete = async (e) => {
    e.preventDefault();
    let warning = `Are you sure to remove account ${username}`;
    if (confirm(warning) != true) {
      return;
    }
    await staffService
      .deleteStaff(id)
      .then(() => {
        alert(`Successfully deactive account ${username}`);
        navigate(`/hotel/staff`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <InfomationForm staff={staff} />
      <hr />
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title mt-2">Change password</h3>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-12 m-b-1">
          <form>
            <div className="row formtype">
              <div className="col-md-6">
                <div className="form-group">
                  <label>User name</label>
                  <input
                    id="username"
                    className="form-control"
                    type="text"
                    placeholder="username"
                    defaultValue={username}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    id="password"
                    className={
                      "form-control " + (pwdValid == false ? "is-invalid" : "")
                    }
                    type={pwdDisplayType}
                    defaultValue={newPassword}
                    onBlur={() => {
                      setPwdDisplayType("password");
                    }}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPwdValid(undefined);
                    }}
                  />
                  <i
                    className="bi bi-eye-slash"
                    id="togglePassword"
                    onClick={() => {
                      pwdDisplayType === "password"
                        ? setPwdDisplayType("text")
                        : setPwdDisplayType("password");
                    }}
                  ></i>
                </div>

                <button
                  type="submit"
                  className="ml-2 btn btn-primary buttonedit"
                  onClick={handleSubmit}
                >
                  Change
                </button>
                <button
                  type="submit"
                  className="mr-2  btn btn-danger float-right"
                  style={{ height: "45px" }}
                  onClick={handelDelete}
                >
                  Deactivate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
