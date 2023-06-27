import "./css/footer.css";

function Footer() {
    return (
        <div className="page-footer">
            <div className="footer-container" >
                <div className="footer-container__bg" >
                    <div className="bg-represent" ></div >
                    <div className="bg-content" >
                        <p>Đây là website quản lý khách sạn</p>
                    </div >
                </div >
                <div className="author-project" >
                    <h3>Tác giả</h3>
                    <p>Trần Vĩnh Phúc</p>
                    <p>Nguyễn Quốc Khoa</p>
                    <p>Huỳnh Luật</p>
                    <p>Võ Hoàng Thảo Nguyên</p>
                </div >
                <div className="support-equipment" >
                    <div className="footer-content-header" >
                        <h3>Công cụ hỗ trợ</h3>
                    </div >
                    <div className="support" >
                        <p>Trello</p>
                        <p>Github</p>
                        <p>Photoshop</p>
                        <p>Figma</p>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default Footer