export default function ServiceTable({ services, handleServiceChange }) {
    return (
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Hotel service</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-nowrap mb-0">
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
                                        <td>{index}</td>
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