import { ProtectComponent } from "@components/authorization";
import { role } from "@config/index";
import $ from "jquery";
import { useEffect } from "react";
import { Link, redirect } from "react-router-dom";

export default function SideBar() {
  const HandleReservationLinkClick = () => {
    redirect("/hotel/reservation");
    //window.location.href = '/hotel/reservation';
  };

  const HandleBookingLinkClick = () => {
    window.location.href = "/hotel/reservation/booking";
  };

  useEffect(() => {
    var Sidemenu = function () {
      this.$menuItem = $("#sidebar-menu a");
    };
    function init() {
      var $this = Sidemenu;
      $("#sidebar-menu a").on("click", function (e) {
        if ($(this).parent().hasClass("submenu")) {
          e.preventDefault();
        }
        if (!$(this).hasClass("subdrop")) {
          $("ul", $(this).parents("ul:first")).slideUp(350);
          $("a", $(this).parents("ul:first")).removeClass("subdrop");
          $(this).next("ul").slideDown(350);
          $(this).addClass("subdrop");
        } else if ($(this).hasClass("subdrop")) {
          $(this).removeClass("subdrop");
          $(this).next("ul").slideUp(350);
        }
      });
      $("#sidebar-menu ul li.submenu a.active")
        .parents("li:last")
        .children("a:first")
        .addClass("active")
        .trigger("click");
    }
    init();
  }, []);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              {" "}
              <Link to="/hotel">
                <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
              </Link>{" "}
            </li>
            <li className="list-divider"></li>
            <li className="submenu">
              {" "}
              <a>
                <i className="fas fa-suitcase"></i> <span> Booking </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  {" "}
                  <Link to="/hotel/reservation">Reservation card</Link>
                </li>
                <li>
                  <Link to="/hotel/reservation/booking">Booking</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              {" "}
              <a href="#">
                <i className="fas fa-file-invoice"></i> <span> Invoice </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  <Link to="/hotel/invoice">All invoices</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              {" "}
              <a href="#">
                <i className="fas fa-book"></i> <span> Room regulation </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  <Link to="/hotel/regulation">All regulations</Link>
                </li>
                <ProtectComponent allowRoles={[role.MANAGER]}>
                  <li>
                    <Link to="/hotel/regulation/add-regulation">
                      Add regulation
                    </Link>
                  </li>
                </ProtectComponent>
              </ul>
            </li>
            <li className="submenu">
              {" "}
              <a href="#">
                <i className="fas fa-clipboard-list"></i> <span> Room detail </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  <Link to="/hotel/room-detail">All room details</Link>
                </li>
                <ProtectComponent allowRoles={[role.MANAGER]}>
                  <li>
                    <Link to="/hotel/room-detail/add-room-detail">
                      Add room detail
                    </Link>
                  </li>
                </ProtectComponent>
              </ul>
            </li>
            <li className="submenu">
              {" "}
              <a href="#">
                <i className="fas fa-bed"></i> <span> Rooms </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  <Link to="/hotel/room">All Rooms </Link>
                </li>

                <ProtectComponent allowRoles={[role.MANAGER]}>
                  <li>
                    <Link to="/hotel/room/add-room"> Add Room </Link>
                  </li>
                </ProtectComponent>
              </ul>
            </li>
            <ProtectComponent allowRoles={[role.MANAGER]}>
              <li className="submenu">
                {" "}
                <a href="#">
                  <i className="fe fe-table"></i> <span> Report </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul className="submenu_class">
                  <li>
                    <Link to="/hotel/revenue">Room Revenue </Link>
                  </li>

                  <li>
                    <Link to="/hotel/room-occupancy"> Room Occupancy</Link>
                  </li>
                </ul>
              </li>
            </ProtectComponent>
            <ProtectComponent allowRoles={[role.MANAGER]}>
              <li className="submenu">
                {" "}
                <a href="#">
                  <i className="fas fa-user"></i> <span> Staff </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul className="submenu_class">
                  <li>
                    <Link to="/hotel/staff">All Staffs </Link>
                  </li>
                  <li>
                    <Link to="/hotel/staff/add-staff"> Add Staff </Link>
                  </li>
                </ul>
              </li>
            </ProtectComponent>
            <li className="submenu">
              {" "}
              <a href="#">
                <i className="fas fa-key"></i> <span> Hotel Services </span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul className="submenu_class">
                <li>
                  <Link to="/hotel/service">All Services </Link>
                </li>

                <ProtectComponent allowRoles={[role.MANAGER]}>
                  <li>
                    <Link to="/hotel/service/add-service"> Add Service </Link>
                  </li>
                </ProtectComponent>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
