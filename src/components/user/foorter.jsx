export default function Footer() {
    return (
        <footer className="footer-section">
            <link rel="stylesheet" media="all" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" crossorigin="anonymous"></link>
            <div className="container">
                <div className="footer-text">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ft-about">
                                <div className="logo">
                                    <a href="#">
                                        <img src="/assets/img/footer-logo.png" className="w-50" alt="" />
                                    </a>
                                </div>
                                <p>We inspire and reach millions of travelers<br /> across 90 local websites</p>
                                {/* <div className="fa-social">
                                    <a href="https://www.facebook.com/phuc.tranvinh.9003"><i className="fa fa-facebook-f" aria-hidden="true"></i></a>
                                    <a href="https://www.facebook.com/khoaterminator/"><i className="fa fa-twitter"></i></a>
                                    <a href="https://www.facebook.com/profile.php?id=100009389821771"><i className="fa fa-tripadvisor"></i></a>
                                    <a href="https://www.facebook.com/oct29thr"><i className="fa fa-instagram"></i></a>

                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div className="ft-contact">
                                <h6>Contact Us</h6>
                                <ul>
                                    <li>(84) 969 486 906</li>
                                    <li>Roomee@hcmus.edu.com</li>
                                    <li>Linh Trung Ward Đông Hòa, dĩ an,bình dương, Thu Duc District, Linh Trung, Khu Phố 6 .</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div className="ft-newslatter">
                                <h6>New latest</h6>
                                <p>Get the latest updates and offers.</p>
                                <form action="#" className="fn-form">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit"><i className="fa fa-send"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <ul>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Terms of use</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Environmental Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="co-text">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}