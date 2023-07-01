import { useEffect, useState } from "react";
import { hotelServiceService } from "@services/index";
import { NavLink, useNavigate } from "react-router-dom";
import { createNotification } from "@utls/notification";
import { ProtectComponent } from "@components/authorization";
import { role } from "@config/index";

export default function AddService() {
  return (
    <>
      <Header />
      <SeviceForm />
    </>
  );
}

function Header() {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title mt-5">Add service</h3>
        </div>
      </div>
    </div>
  );
}

function SeviceForm() {
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("Room service");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await hotelServiceService
      .addService({
        serviceName: serviceName,
        category: category,
        unitPrice: parseFloat(price),
      })
      .then((data) => {
        alert("New service successfully added");
        navigate(`/hotel/service`);
      })
      .catch((err) => {
        const { message = "", code = err.response?.data } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      });
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex justify-content align-items ">
        <div className="col-md-9">
          <form>
            <div className="row formtype">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Service name</label>
                  <input
                    id="servicename"
                    className="form-control"
                    type="text"
                    placeholder="service name"
                    required
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    id="rolelist"
                    name="role"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Room service</option>
                    <option>Food</option>
                    <option>Drink</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Unit price</label>
                  <input
                    id="uprice"
                    className="form-control"
                    type="numbert"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-primary mt-5"
            onClick={handleSubmit}
          >
            Add service
          </button>
        </div>
        <div className="col-md-3  mb-4">
          <div
            id="preview"
            className="d-flex justify-content-center align-items-center"
          >
            <img src="/assets/img/services/default-service.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
