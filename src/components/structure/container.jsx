import "./css/container.css";

export default function Container({ children }) {
    return (
        <div id="container">
            {children}
        </div>
    );
}