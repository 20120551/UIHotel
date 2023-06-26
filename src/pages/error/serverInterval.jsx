import { Link } from "react-router-dom";

export default function ServerInterval() {
    return (
        <div class="main-wrapper">
            <div class="error-box">
                <h1>500</h1>
                <h3 class="h2 mb-3"><i class="fas fa-exclamation-triangle"></i> Oops! Something went wrong</h3>
                <p class="h4 font-weight-normal">The page you requested was not found.</p>
                <Link to="/" class="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    )
}