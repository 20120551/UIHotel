import { Link } from "react-router-dom";

export default function Unauthorization() {
    return (
        <div class="main-wrapper">
            <div class="error-box">
                <h1>401</h1>
                <h3 class="h2 mb-3"><i class="fas fa-exclamation-triangle"></i> Oops! Something went wrong</h3>
                <p class="h4 font-weight-normal">You are not have permission on that route</p>
                <Link to="/" class="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    )
}