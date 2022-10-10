import * as React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/account.index.styles.scss";
export default function AccountHomeComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="account-home-container">
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-2 col-sm-3">
          <div className="card card-stats shadow border roundeded">
            <div className="card-body">
              <div className="row">
                <div className="col-5 col-md-4 col-sm-12 d-flex align-items-center">
                  <div className="icon-big text-center">
                    <ListAltIcon className="fs-1" />
                    {/* <i className="fa fa-list-alt fa-3x" aria-hidden="true"></i> */}
                  </div>
                </div>
                <div className="col-7 col-md-8">
                  <div className="numbers">
                    <p className="card-category fs-6 fw-bold">Fatwas</p>
                    <p className="card-title fs-5 fw-bold">67 </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3">
          <div className="card card-stats shadow border roundeded">
            <div className="card-body">
              <div className="row">
                <div className="col-5 col-md-4 d-flex align-items-center">
                  <div className="icon-big text-center">
                    <BorderColorIcon className="text-success fs-1" />
                    {/* <i className="fa fa-edit fa-3x text-success"></i> */}
                  </div>
                </div>
                <div className="col-7 col-md-8">
                  <div className="numbers">
                    <p className="card-category fs-6 fw-bold">Answered</p>
                    <p className="card-title fs-5 fw-bold">2 </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3">
          <div className="card card-stats shadow border roundeded">
            <div className="card-body">
              <div className="row">
                <div className="col-5 col-md-4 d-flex align-items-center">
                  <div className="icon-big text-center text-warning">
                    <QueryBuilderIcon className="fs-1 icon-warning" />
                    {/* <i className="fa fa-clock-o fa-3x icon-warning"></i> */}
                  </div>
                </div>
                <div className="col-7 col-md-8">
                  <div className="numbers">
                    <p className="card-category fs-6 fw-bold">Pendings</p>
                    <p className="card-title fs-5 fw-bold">34</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3">
          <div className="card card-stats shadow border roundeded">
            <div className="card-body">
              <div className="row">
                <div className="col-5 col-md-4 d-flex align-items-center">
                  <div className="icon-big text-center icon-warning">
                    <CloseIcon className="text-danger fs-1" />
                    {/* <i className="fa fa-close fa-3x text-danger"></i> */}
                  </div>
                </div>
                <div className="col-7 col-md-8">
                  <div className="numbers">
                    <p className="card-category fs-6 fw-bold">Rejected</p>
                    <p className="card-title fs-5 fw-bold">23 </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 table-section">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Short Question</th>
              <th scope="col">Madhab</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Language</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#1245</td>
              <td>dbkjvgidofbd vidoyvdbhvd</td>
              <td>dgdfdvv</td>
              <td>ffsfsdffs</td>
              <td>
                <span>fsfdsfdsfd</span>
              </td>
              <td>fdsfdfd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
