import React from "react";
import { Container, CardHeader, CardBody, Row, Col, Card } from "shards-react";
//import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPrescriptions } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
//import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Prescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: null
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getPrescriptions();
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userprofile) {
      this.setState({
        prescriptions: nextProps.userprofile.prescriptions
      });
    } else {
      this.setState({
        prescriptions: null
      });
    }
  }

  render() {
    const prescriptions = this.props.userprofile.prescriptions;
    let presList;

    console.log(prescriptions);

    let chamber_name, chamber_loc;

    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    if (prescriptions) {
      presList = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profiles</span>
              <h3 className="page-title">Prescriptions</h3>
            </div>
          </div>
          {/* Second Row of Posts */}

          {prescriptions.map((post, idx) => (
            <Row key={idx}>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <div className="prescription-header">
                      <img className="rounded-circle" src={post.pic} alt="" />{" "}
                      <div>
                        <h6 className="text-danger font-weight-bold">
                          {post.name}
                        </h6>

                        {post.chambers.map((chamb, id) => {
                          if (post.cid === chamb.cid) {
                            chamber_name = chamb.name;
                            chamber_loc = chamb.location;
                          }
                          return "";
                        })}

                        <p>{chamber_name + " " + chamber_loc}</p>
                        <p className="pres-date">
                          {new Date(post.date).getDay() +
                            " " +
                            month[new Date(post.date).getMonth()] +
                            " " +
                            new Date(post.date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light pres-cat">
                        <tr>
                          <th scope="col" className="border-0">
                            #
                          </th>
                          <th scope="col" className="border-0">
                            Medicine Name
                          </th>
                          <th scope="col" className="border-0">
                            Morning
                          </th>
                          <th scope="col" className="border-0">
                            Noon
                          </th>
                          <th scope="col" className="border-0">
                            Night
                          </th>
                          <th scope="col" className="border-0">
                            Durantion
                          </th>
                        </tr>
                      </thead>
                      <tbody className="tdody-block">
                        {post.medicines.map((med, idm) => (
                          <tr key={idm}>
                            <td>
                              {" "}
                              <p>#</p>
                              {idm + 1}
                            </td>
                            <td>
                              <p>Medicine Name</p>
                              {med.name}
                            </td>
                            <td>
                              <p>Morning</p>
                              {med.morning.quantity > 0
                                ? med.morning.quantity
                                : ""}
                              <span className="meal-time">
                                {!med.morning.time ? "Before meal" : ""}
                              </span>
                            </td>
                            <td>
                              <p>Noon</p>
                              {med.noon.quantity > 0 ? (
                                med.noon.quantity
                              ) : (
                                <i className="material-icons mr-1 nomed">
                                  cancel
                                </i>
                              )}
                              <span
                                className="meal-time"
                                datatoggle="tooltip"
                                title="Before Meal"
                              >
                                {!med.noon.time ? "Before Meal" : ""}
                              </span>
                            </td>
                            <td>
                              <p>Night</p>
                              {med.night.quantity > 0 ? med.night.quantity : ""}
                              <span className="meal-time">
                                {!med.night.time ? "Before Meal" : ""}
                              </span>
                            </td>
                            <td>
                              <p>Duration</p>
                              {med.duration + " days"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row testsDiv">
                      <div className="col-lg-4 col-md-6 col-sm-12 pl-0">
                        <h6>Tests</h6>
                        {post.tests.map((test, id) => (
                          <p>
                            {id + 1 + ". "} {test}
                          </p>
                        ))}
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 pl-0">
                        <h6>Advices</h6>
                        {post.advices.map((advice, id) => (
                          <p>
                            {id + 1 + ". "} {advice}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}
        </Container>
      );
    } else {
      presList = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }

    return presList;
  }
}

Prescriptions.propTypes = {
  getPrescriptions: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userprofile: state.userprofile
});

export default connect(
  mapStateToProps,
  { getPrescriptions }
)(withRouter(Prescriptions));
