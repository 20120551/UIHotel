import SearchBar from "@components/search/searchBar";
import { useSearch } from "@hooks/context-hooks";
import { search } from "@store/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [state, dispatch] = useSearch();
    const navigate = useNavigate();
    const handleSearch = function (searchInfo) {
        dispatch(search.cacheSearch(searchInfo));
        navigate("/search");
    }

    useEffect(() => {
        document.querySelectorAll(".set-bg")
            .forEach(tag => {
                const bg = tag.getAttribute("data-setbg");
                tag.style.backgroundImage = 'url(' + bg + ')'
            })
    })

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero-text">
                                <h1>Roomee </h1>
                                <h1>Luxury Hotel</h1>
                                <p>Here are the best hotel booking sites, including recommendations for international
                                    travel and for finding low-priced hotel rooms.</p>
                                <a href="#" className="primary-btn">Discover Now</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-slider owl-carousel">
                    <div className="hs-item set-bg" data-setbg="/assets/img/hero/hero-1.jpg">
                    </div>
                    {/* <div className="hs-item set-bg" data-setbg="/assets/img/hero/hero-2.jpg">
                    </div>
                    <div className="hs-item set-bg" data-setbg="/assets/img/hero/hero-3.jpg">
                    </div> */}
                </div>
                <div className="container" style={{
                    bottom: "-50px",
                    left: 0,
                    right: 0,
                    position: "absolute"
                }}>
                    <SearchBar handleSearch={handleSearch} info={state.searchInfo} />
                </div>
            </section>
            <section className="aboutus-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="about-text">
                                <div className="section-title">
                                    <span>About Us</span>
                                    <h2>Intercontinental LA <br />Westlake Hotel</h2>
                                </div>
                                <p className="f-para">Roomee.com is a leading online accommodation site. We’re passionate about
                                    travel. Every day, we inspire and reach millions of travelers across 90 contries.</p>
                                <p className="s-para">So when it comes to booking the perfect hotel, vacation rental, resort,
                                    apartment, guest house, or tree house, we’ve got you covered.</p>
                                <a href="#" className="primary-btn about-btn">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-pic">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <img src="/assets/img/about/about-1.jpg" alt="" />
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="/assets/img/about/about-2.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>What We Do</span>
                                <h2>Discover Our Services</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-036-parking"></i>
                                <h4>Our Vision</h4>
                                <p> We prioritize your comfort and convenience, offering a range of exceptional services designed to enhance your travel experience. From exquisite catering options to reliable transportation and attentive childcare, we strive to exceed your expectations and create cherished memories during your stay with us.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-033-dinner"></i>
                                <h4>Catering Service</h4>
                                <p>Indulge in a culinary journey with our exceptional catering service. Our skilled chefs prepare a diverse range of delectable dishes, combining local flavors with international cuisine. Whether you're hosting a private event or simply seeking a memorable dining experience, our catering service will exceed your expectations.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-026-bed"></i>
                                <h4>Babysitting</h4>
                                <p>Traveling with little ones? Rest assured knowing that our professional and experienced babysitters are available to provide attentive care for your children. Enjoy some well-deserved relaxation or explore the city's attractions with peace of mind, knowing your kids are in safe hands.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-024-towel"></i>
                                <h4>Laundry</h4>
                                <p>We understand the importance of keeping your wardrobe fresh and clean during your stay. Our efficient laundry service ensures your garments are promptly laundered, pressed, and returned to you in pristine condition. Simply drop off your items, and we'll take care of the rest, so you can focus on enjoying your time with us.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-044-clock-1"></i>
                                <h4>Hire Driver</h4>
                                <p> Discover the wonders of the city with ease by availing our hire driver service. Our skilled and knowledgeable drivers will navigate you through the streets, ensuring you reach your desired destinations efficiently and comfortably. Sit back, relax, and let us take care of the transportation logistics for you.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="service-item">
                                <i className="flaticon-012-cocktail"></i>
                                <h4>Bar & Drink</h4>
                                <p>Unwind and socialize at our stylish bar, offering a wide selection of refreshing beverages, expertly crafted cocktails, and a curated wine list. Whether you're looking to kick-start your evening or wind down after a day of exploration, our bar provides the perfect ambiance to enjoy a drink and engage in lively conversations with fellow travelers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Hotel News</span>
                                <h2>Our Blog & Event</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="blog-item set-bg" data-setbg="/assets/img/blog/blog-1.jpg">
                                <div className="bi-text">
                                    <span className="b-tag">Travel Trip</span>
                                    <h4><a href="#">Tremblant In Canada</a></h4>
                                    <div className="b-time"><i className="icon_clock_alt"></i> 15th April, 2019</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-item set-bg" data-setbg="/assets/img/blog/blog-2.jpg">
                                <div className="bi-text">
                                    <span className="b-tag">Camping</span>
                                    <h4><a href="#">Choosing A Static Caravan</a></h4>
                                    <div className="b-time"><i className="icon_clock_alt"></i> 15th April, 2019</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-item set-bg" data-setbg="/assets/img/blog/blog-3.jpg">
                                <div className="bi-text">
                                    <span className="b-tag">Event</span>
                                    <h4><a href="#">Copper Canyon</a></h4>
                                    <div className="b-time"><i className="icon_clock_alt"></i> 21th April, 2019</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="blog-item small-size set-bg" data-setbg="/assets/img/blog/blog-wide.jpg">
                                <div className="bi-text">
                                    <span className="b-tag">Event</span>
                                    <h4><a href="#">Trip To Iqaluit In Nunavut A Canadian Arctic City</a></h4>
                                    <div className="b-time"><i className="icon_clock_alt"></i> 08th April, 2019</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-item small-size set-bg" data-setbg="/assets/img/blog/blog-10.jpg">
                                <div className="bi-text">
                                    <span className="b-tag">Travel</span>
                                    <h4><a href="#">Traveling To Barcelona</a></h4>
                                    <div className="b-time"><i className="icon_clock_alt"></i> 12th April, 2019</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}