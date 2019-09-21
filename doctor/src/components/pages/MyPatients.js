import React from "react";
import { Container, CardBody, Row, Col, Card, Badge } from "shards-react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { getAppointmentsByCid } from "../../actions/appointmentActions";

class MyPatients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: null
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.cid) {
        this.props.getAppointmentsByCid(this.props.match.params.cid);
      }
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
      console.log("hello");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointment) {
      this.setState({
        appointments: nextProps.appointment.appointments
      });
    } else {
      this.setState({
        appointments: null
      });
    }
  }

  render() {
    const appointmentList = this.state.appointments;
    let doctorsLists;
    let totalapp = 0;

    doctorsLists = (
      <div className="main-content-container container-fluid px-4">
        <Spinner />
      </div>
    );

    if (
      this.state.appointments &&
      Object.keys(this.state.appointments).length > 0
    ) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Today's Appointments</h3>
            </div>
          </div>
          {/* Second Row of Posts */}
          <Row>
            {appointmentList.map((appointment, id) => (
              <Col lg="4" sm="12" md="6" className="mb-4" key={id}>
                <Link
                  to={`/prescribe/${appointment.cid}/${appointment.pid}`}
                  className="blackText"
                >
                  <Card
                    small
                    className="card-post card-post--aside card-post--1"
                  >
                    <CardBody className="p-4">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          class="fas fa-user-circle"
                          style={{
                            fontSize: "24px",
                            marginRight: "1rem",
                            color: "#34A853"
                          }}
                        ></i>
                        <p className="headingText font-weight-bold mb-0">
                          <b>{appointment.name}</b>
                        </p>
                        {appointment.prescribed ? (
                          <i
                            class="fas fa-check-circle"
                            style={{
                              fontSize: "16px",
                              paddingTop: "4px",
                              color: "green"
                            }}
                          ></i>
                        ) : null}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
    return doctorsLists;
  }
}

MyPatients.propTypes = {
  getAppointmentsByCid: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  docprofile: state.docprofile,
  appointment: state.appointment
});

export default connect(
  mapStateToProps,
  { getAppointmentsByCid }
)(MyPatients);
