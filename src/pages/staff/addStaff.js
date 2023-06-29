import { useDebugValue, useEffect, useState } from "react";
import { staffService } from "@services/index";
import "./staff.css";
import { generate_email } from "@utls/autoGenerate";
import { generate_username } from "@utls/autoGenerate";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
  return (
    <>
      <Header />
      <CreateForm />
    </>
  );
}

function Header() {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title mt-5">Add Staff</h3>
        </div>
      </div>
    </div>
  );
}

function CreateForm() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState({
    value: "",
    validation: undefined,
  });
  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    validation: undefined,
  });
  const [email, setEmail] = useState({ value: "", validation: undefined });
  const [username, setusername] = useState({
    value: "",
    validation: undefined,
  });
  const [role, setRole] = useState("Staff");
  const [password, setPassWord] = useState({
    value: "123456",
    validation: undefined,
  });
  const [cfpassword, setCfpassWord] = useState({
    value: "123456",
    validation: undefined,
  });
  const [pwdDisplayType, setPwdDisplayType] = useState("password");
  const [cfPwdDisplayType, setCfpwdDisplayType] = useState("password");
  useEffect(() => {
    autofill();
  }, [fullname.value, phoneNumber.value]);

  const handleSubmit = async (event) => {
    if (validate()) {
      event.preventDefault();
      await staffService
        .createStaff({
          account: username.value,
          password: password.value,
          fullName: fullname.value,
          email: email.value,
          telephoneNumber: phoneNumber.value,
          role: role,
        })
        .then((data) => {
          alert("New staff successfully created");
          navigate(`/hotel/staff/edit-staff/${data.id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const autofill = () => {
    if (fullname.value.length > 5 && phoneNumber.value.length > 5) {
      let new_email = generate_email(fullname.value, phoneNumber.value);
      let new_username = generate_username(fullname.value, phoneNumber.value);
      setEmail({ value: new_email, validation: undefined });
      setusername({ value: new_username, validation: undefined });
    }
  };
  const ValidateHelper = (state) => {
    if (state === undefined) {
      return " ";
    }
    return " is-invalid";
  };

  const validate = () => {
    // Retrieve form values
    var full_name = fullname.value;
    var phone_number = phoneNumber.value;
    var _email = email.value;
    var _username = username.value;
    var _password = password.value;
    var confirm_password = cfpassword.value;
    let result = true;
    // Validate full name
    if (full_name.length < 6) {
      setFullname({ value: full_name, validation: false });
      result = false;
    }

    // Validate phone number
    var phone_regex = /^\d{10}$/;
    if (!phone_regex.test(phone_number)) {
      setPhoneNumber({ value: phoneNumber, validation: false });
      result = false;
    }

    // Validate email
    var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(_email)) {
      setEmail({ value: _email, validation: false });
      result = false;
    }

    // Validate username
    if (_username.length < 6) {
      setusername({ value: _username, validation: false });
      result = false;
    }

    // Validate password
    if (_password.length < 6) {
      console.log(_password);
      setPassWord({ value: _password, validation: false });
      result = false;
    }

    // Validate confirm password
    if (confirm_password !== _password) {
      setCfpassWord({ value: confirm_password, validation: false });
      result = false;
    }
    return result;
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div className="row formtype">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    id="fullname"
                    className={
                      "form-control" + ValidateHelper(fullname.validation)
                    }
                    type="text"
                    placeholder="Nguyễn Văn A"
                    required
                    onChange={(e) => {
                      setFullname({
                        value: e.target.value,
                        validation: undefined,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    id="phone"
                    className={
                      "form-control" + ValidateHelper(phoneNumber.validation)
                    }
                    type="text"
                    placeholder="0999123123"
                    minLength="10"
                    maxLength="10"
                    required
                    onChange={(e) => {
                      setPhoneNumber({
                        value: e.target.value,
                        validation: undefined,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    id="email"
                    className={
                      "form-control" + ValidateHelper(email.validation)
                    }
                    type="text"
                    placeholder="nva3123@sonahotel.vn"
                    required
                    defaultValue={email.value}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    id="username"
                    className={
                      "form-control" + ValidateHelper(username.validation)
                    }
                    type="text"
                    placeholder="username"
                    defaultValue={username.value}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    id="rolelist"
                    name="role"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option>Staff</option>
                    <option>Manager</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    id="password"
                    className={
                      "form-control" + ValidateHelper(password.validation)
                    }
                    type={pwdDisplayType}
                    defaultValue="123456"
                    onBlur={() => {
                      setPwdDisplayType("password");
                    }}
                    onChange={(e) =>
                      setPassWord({
                        value: e.target.value,
                        validation: undefined,
                      })
                    }
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
              </div>
              <div className="col-md-3">
                <div
                  className="form-group"
                  onBlur={() => {
                    setCfpwdDisplayType("password");
                  }}
                  onChange={(e) =>
                    setCfpassWord({
                      value: e.target.value,
                      validation: undefined,
                    })
                  }
                >
                  <label>Confirm Password</label>
                  <input
                    id="cfpassword"
                    className={
                      "form-control" + ValidateHelper(cfpassword.validation)
                    }
                    type={cfPwdDisplayType}
                    defaultValue="123456"
                  />
                  <i
                    className="bi bi-eye-slash"
                    id="toggleCfpassword"
                    onClick={() => {
                      cfPwdDisplayType === "password"
                        ? setCfpwdDisplayType("text")
                        : setCfpwdDisplayType("password");
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary buttonedit"
        onClick={handleSubmit}
      >
        Create
      </button>
    </>
  );
}
