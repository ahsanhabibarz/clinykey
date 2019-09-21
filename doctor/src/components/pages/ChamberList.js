import React from "react";
import { Container, CardBody, Row, Col, Card, Badge } from "shards-react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByOid } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { getAppointments } from "../../actions/appointmentActions";

class ChamberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileByOid(
        this.props.auth.user.oid,
        this.props.history,
        this.props.location
      );
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
      console.log("hello");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.docprofile) {
      this.setState({
        profile: nextProps.docprofile.profiles
      });
    } else {
      this.setState({
        profile: null
      });
    }
  }

  render() {
    const profileList = this.props.docprofile.profiles;
    let doctorsLists;
    let totalapp = 0;

    if (profileList) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Chambers</h3>
            </div>
          </div>
          {/* Second Row of Posts */}
          <Row>
            {profileList[0].chambers.map((chamber, id) => (
              <Col lg="4" sm="12" md="6" className="mb-4" key={id}>
                <Link to={`/mypatients/${chamber.cid}`} className="blackText">
                  <Card
                    small
                    className="card-post card-post--aside card-post--1 chamber-card"
                  >
                    <CardBody className="p-4">
                      <div>
                        <div>
                          <p className="headingText">{chamber.name}</p>
                          <span className="descriptionText">
                            {chamber.area}
                          </span>
                          <div className="mb-2">
                            <span className="mr-2 mb-0 descriptionText">
                              {chamber.from > 12
                                ? chamber.from - 12 + " PM"
                                : chamber.from + " AM"}{" "}
                              -{" "}
                              {chamber.to > 12
                                ? chamber.to - 12 + " PM"
                                : chamber.to + " AM"}
                            </span>{" "}
                            <span className="descriptionText mb-0">
                              {" "}
                              {" " + chamber.fee + " Taka"}
                            </span>
                          </div>
                          <div>
                            {chamber.days.map((day, id) => (
                              <span key={id} className="days mr-2">
                                {day.substring(0, 1).toUpperCase() +
                                  day.substring(1, 3) +
                                  " "}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      );
    } else {
      doctorsLists = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }

    return doctorsLists;
  }
}

ChamberList.propTypes = {
  getProfileByOid: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { getProfileByOid }
)(ChamberList);
