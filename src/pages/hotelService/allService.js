import { useEffect, useState } from "react";
import { hotelServiceService } from "@services/index";
import { NavLink } from "react-router-dom";
import { createNotification } from "@utls/notification";
import { ProtectComponent } from "@components/authorization";
import { role } from "@config/index";

export default function AllServices() {
  return (
    <>
      <Header />

      <ItemList />
    </>
  );
}

function Header() {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <div className="mt-5">
            <h4 className="card-title float-left mt-2">All Services</h4>{" "}
            <ProtectComponent allowRoles={[role.MANAGER]}>
              <NavLink
                to="/hotel/service/add-service"
                className="btn btn-primary float-right veiwbutton"
              >
                Add Service
              </NavLink>
            </ProtectComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar(props) {
  const [cat, setCat] = useState("all categories");
  const [content, setContent] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    await hotelServiceService
      .searchForService({
        value: content,
        category: cat,
      })
      .then((data) => {
        props.updateList(data);
      })
      .catch(function (err) {
        const { message = "", code = "" } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      });
  };
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
                  placeholder="search service..."
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <select
                  className="form-control"
                  id="sel1"
                  name="catlist1"
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option>All categories</option>
                  <option value="Room service">Room service</option>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <button
                  className="btn btn-success btn-block mt-0 search_button"
                  onClick={handleSearch}
                >
                  {" "}
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ItemList() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    hotelServiceService
      .getAllServices()
      .then((data) => {
        setServices(data);
      })
      .catch((err) => {
        const { message = "", code = "" } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      });
  }, []);
  const searchResult = (result) => {
    setServices(result);
  };

  const handleRemoveService = function (e, id) {
    e.preventDefault();
    hotelServiceService.deleteService({ id })
      .then(_ => {
        setServices(prev => prev.filter(service => service.id !== id));
        createNotification({ type: "success", title: "delete service", message: `delete service at ${id} successfully` });
      }).catch(err => {
        const { message = "", code = "" } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      })
  }

  return (
    <>
      <SearchBar updateList={searchResult} />
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body booking_card">
              <div className="table-responsive">
                <table className=" table table-stripped table table-hover table-center mb-0 text-center">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Service ID</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th>Unit price</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => {
                      return (
                        <tr>
                          <td>
                            <div
                              className="avatar avatar-xxl "
                              style={{ maxHeight: "50px", maxWidth: "50px" }}
                            >
                              <img
                                className="avatar-img"
                                src={`/assets/img/services/${s.category}.png`}
                                style={{ maxWidth: "50px" }}
                              />
                            </div>
                          </td>
                          <td>{s.id}</td>
                          <td>
                            <div>{s.serviceName}</div>
                          </td>

                          <td>
                            <div
                              className="btn btn-sm bg-success-light"
                              style={{ width: "120px" }}
                            // style={{ backgroundColor: "#dae0e5" }}
                            >
                              {s.category}
                            </div>
                          </td>

                          <td>
                            {parseFloat(s.unitPrice).toLocaleString("en")} VND
                          </td>

                          <td className=" text-right">
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
                                <a
                                  className="dropdown-item"
                                  onClick={(e) => handleRemoveService(e, s.id)}
                                >
                                  <i className="fas fa-pencil-alt m-r-5"></i>
                                  Remove
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
        </div>
      </div>
    </>
  );
}
