import MayEmpty from "@components/mayEmpty/mayEmpty";
import Container from "@components/structure/container";

export default function Invoice() {
  return (
    <>
      <Header />
      <Body invoices={[]} />
    </>
  );
}

function Body({ invoices }) {
  <div class="row">
    <div class="col-sm-12">
      <div class="card-body booking_card">
        <div class="mb-2">
          <ul class="nav nav-tabs nav-tabs-solid">
            <li class="nav-item">
              <a class="nav-link active" href="#solid-tab1" data-toggle="tab">
                Pending
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#solid-tab2" data-toggle="tab">
                Deposit
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#solid-tab3" data-toggle="tab">
                Checkout
              </a>
            </li>
          </ul>
        </div>
        <div class="table-responsive">
          <MayEmpty
            isEmpty={invoices.length === 0 ? true : false}
            name="invoice"
          >
            <table class="table-stripped table table-hover table-center mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice Number</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => {
                  const { id, date, status, totalSum, nameCus } = invoice;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{id}</td>
                      <td>{date}</td>
                      <td>{status}</td>
                      <td>{totalSum}$</td>
                      <td>{nameCus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </MayEmpty>
        </div>
        <nav aria-label="Page navigation" class="mt-3 float-right">
          <ul class="pagination">
            <li class="page-item page-link">Previous</li>
            <li class="page-item page-link">1</li>
            <li class="page-item page-link">Next</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>;
}

function Header() {
  return (
    <>
      <div class="row">
        <form>
          <div class="row formtype">
            <div class="col-md-6">
              <div class="form-group">
                <label>Invoice</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Search</label>
                <button class="btn btn-success btn-block mt-0 search_button">
                  {" "}
                  Search{" "}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
