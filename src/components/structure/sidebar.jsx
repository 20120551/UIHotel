import $ from 'jquery';
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    useEffect(() => {
        var Sidemenu = function () { this.$menuItem = $('#sidebar-menu a'); };
        function init() {
            var $this = Sidemenu; $('#sidebar-menu a').on('click', function (e) {
                if ($(this).parent().hasClass('submenu')) { e.preventDefault(); }
                if (!$(this).hasClass('subdrop')) {
                    $('ul', $(this).parents('ul:first')).slideUp(350); $('a', $(this).parents('ul:first')).removeClass('subdrop'); $(this).next('ul').slideDown(350); $(this).addClass('subdrop');
                }
                else if ($(this).hasClass('subdrop')) {
                    $(this).removeClass('subdrop'); $(this).next('ul').slideUp(350);
                }
            }); $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
        }
        init();
    }, [])
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li> <Link to="/"><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></Link> </li>
                        <li className="list-divider"></li>
                        <li className="submenu"> <a ><i className="fas fa-suitcase"></i> <span> Booking </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="all-booking.html"> All Booking </a></li>
                                <li><a href="edit-booking.html"> Edit Booking </a></li>
                                <li><a href="add-booking.html"> Add Booking </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-user"></i> <span> Customers </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="all-customer.html"> All customers </a></li>
                                <li><a href="edit-customer.html"> Edit Customer </a></li>
                                <li><a href="add-customer.html"> Add Customer </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-key"></i> <span> Rooms </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="all-rooms.html">All Rooms </a></li>
                                <li><a href="edit-room.html"> Edit Rooms </a></li>
                                <li><a href="add-room.html"> Add Rooms </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-user"></i> <span> Staff </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="all-staff.html">All Staff </a></li>
                                <li><a href="edit-staff.html"> Edit Staff </a></li>
                                <li><a href="add-staff.html"> Add Staff </a></li>
                            </ul>
                        </li>
                        <li> <a href="pricing.html"><i className="far fa-money-bill-alt"></i> <span>Pricing</span></a> </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-share-alt"></i> <span> Apps </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="chat.html"><i className="fas fa-comments"></i><span> Chat </span></a></li>
                                <li className="submenu"> <a href="#"><i className="fas fa-video camera"></i> <span> Calls </span> <span className="menu-arrow"></span></a>
                                    <ul className="submenu_class">
                                        <li><a href="voice-call.html"> Voice Call </a></li>
                                        <li><a href="video-call.html"> Video Call </a></li>
                                        <li><a href="incoming-call.html"> Incoming Call </a></li>
                                    </ul>
                                </li>
                                <li className="submenu"> <a href="#"><i className="fas fa-envelope"></i> <span> Email </span> <span className="menu-arrow"></span></a>
                                    <ul className="submenu_class">
                                        <li><a href="compose.html">Compose Mail </a></li>
                                        <li><a href="inbox.html"> Inbox </a></li>
                                        <li><a href="mail-veiw.html"> Mail Veiw </a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-user"></i> <span> Employees </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="employees.html">Employees List </a></li>
                                <li><a href="leaves.html">Leaves </a></li>
                                <li><a href="holidays.html">Holidays </a></li>
                                <li><a href="attendance.html">Attendance </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="far fa-money-bill-alt"></i> <span> Accounts </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li>
                                    <Link></Link></li>
                                <li><a href="payments.html">Payments </a></li>
                                <li><a href="expenses.html">Expenses </a></li>
                                <li><a href="taxes.html">Taxes </a></li>
                                <li><a href="provident-fund.html">Provident Fund </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-book"></i> <span> Payroll </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="salary.html">Employee Salary </a></li>
                                <li><a href="salary-veiw.html">Payslip </a></li>
                            </ul>
                        </li>
                        <li> <a href="calendar.html"><i className="fas fa-calendar-alt"></i> <span>Calendar</span></a> </li>
                        <li className="submenu"> <a href="#"><i className="fe fe-table"></i> <span> Blog </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class d-lg-none d-none">
                                <li><a href="blog.html">Blog </a></li>
                                <li><a href="blog-details.html">Blog Veiw </a></li>
                                <li><a href="add-blog.html">Add Blog </a></li>
                                <li><a href="edit-blog.html">Edit Blog </a></li>
                            </ul>
                        </li>
                        <li> <a href="assets.html"><i className="fas fa-cube"></i> <span>Assests</span></a> </li>
                        <li className="active"> <a href="activities.html"><i className="far fa-bell"></i> <span>Activities</span></a> </li>
                        <li className="submenu"> <a href="#"><i className="fe fe-table"></i> <span> Reports </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="expense-reports.html">Expense Report </a></li>
                                <li><a href="invoice-reports.html">Invoice Report </a></li>
                            </ul>
                        </li>
                        <li> <a href="settings.html"><i className="fas fa-cog"></i> <span>Settings</span></a> </li>
                        <li className="list-divider"></li>
                        <li className="menu-title mt-3"> <span>UI ELEMENTS</span> </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-laptop"></i> <span> Components </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="uikit.html">UI Kit </a></li>
                                <li><a href="typography.html">Typography </a></li>
                                <li><a href="tabs.html">Tabs </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-edit"></i> <span> Forms </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="form-basic-inputs.html">Basic Input </a></li>
                                <li><a href="form-input-groups.html">Input Groups </a></li>
                                <li><a href="form-horizontal.html">Horizontal Form </a></li>
                                <li><a href="form-vertical.html">Vertical Form </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-table"></i> <span> Tables </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="tables-basic.html">Basic Table </a></li>
                                <li><a href="tables-datatables.html">Data Table </a></li>
                            </ul>
                        </li>
                        <li className="list-divider"></li>
                        <li className="menu-title mt-3"> <span>EXTRAS</span> </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-columns"></i> <span> Pages </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="login.html">Login </a></li>
                                <li><a href="register.html">Register </a></li>
                                <li><a href="forgot-password.html">Forgot Password </a></li>
                                <li><a href="change-password.html">Change Password </a></li>
                                <li><a href="lock-screen.html">Lockscreen </a></li>
                                <li><a href="profile.html">Profile </a></li>
                                <li><a href="gallery.html">Gallery </a></li>
                                <li><a href="error-404.html">404 Error </a></li>
                                <li><a href="error-500.html">500 Error </a></li>
                                <li><a href="blank-page.html">Blank Page </a></li>
                            </ul>
                        </li>
                        <li className="submenu"> <a href="#"><i className="fas fa-share-alt"></i> <span> Multi Level </span> <span className="menu-arrow"></span></a>
                            <ul className="submenu_class">
                                <li><a href="">Level 1 </a></li>
                                <li><a href="">Level 2 </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}