export default function ServiceTable({ services, handleServiceChange }) {
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Hotel service</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-nowrap mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => {
                                const { id, serviceName, unitPrice } = service;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>{id}</td>
                                        <td>{serviceName}</td>
                                        <td>{unitPrice}</td>
                                        <td>
                                            <button
                                                onClick={() => handleServiceChange({ id })}
                                                className="btn btn-info">Change</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}