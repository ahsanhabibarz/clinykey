import React from "react";
import { Container, CardBody, Row, Col, Card, Badge } from "shards-react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class DoctorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
  }

  componentDidMount() {
    this.props.getProfiles();
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

    if (profileList) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profiles</span>
              <h3 className="page-title">Doctors</h3>
            </div>
          </div>
          {/* Second Row of Posts */}
          <Row>
            {profileList.map((post, idx) => (
              <Col lg="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--aside card-post--1">
                  <CardBody className="ml-2">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "15% 85%",
                        marginBottom: "1rem"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          display: "grid",
                          alignItems: "center"
                        }}
                      >
                        <Link to={`/doctor/${post.oid}`}>
                          <div>
                            <img
                              className="rounded-circle docProfileImage"
                              src={post.picture}
                              alt=""
                            />
                          </div>
                        </Link>
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <div>
                          <p className="card-text d-inline-block mb-1 headingText">
                            {post.name}
                          </p>
                        </div>
                        <div>
                          {post.chambers[0] ? (
                            <p className="card-text mb-0 descriptionText font-weight-bold">
                              {post.chambers[0].name +
                                " - " +
                                post.chambers[0].area}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div>
                          <p className="card-text d-inline-block mb-2 descriptionText">
                            {post.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        className="mb-2 days"
                        style={{ marginRight: ".36rem" }}
                      >
                        {post.category}
                      </span>
                      {post.chambers[0]
                        ? post.chambers[0].days.map((day, id) => (
                            <span key={id} className="mr-2 mb-2 days">
                              {day.substring(0, 1).toUpperCase() +
                                day.substring(1, 3) +
                                " "}
                            </span>
                          ))
                        : ""}
                    </div>
                    <div>
                      <span
                        className="days mb-2"
                        style={{ marginRight: ".36rem" }}
                      >
                        {post.chambers[0]
                          ? post.chambers[0].from > 12
                            ? post.chambers[0].from - 12 + " PM"
                            : post.chambers[0].from + " AM"
                          : ""}{" "}
                        -{" "}
                        {post.chambers[0]
                          ? post.chambers[0].to > 12
                            ? post.chambers[0].to - 12 + " PM"
                            : post.chambers[0].to + " AM"
                          : ""}
                      </span>{" "}
                      <span className="mb-2 days">
                        {post.chambers[0] ? post.chambers[0].fee + " Taka" : ""}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "85% 15%"
                      }}
                    >
                      <div className="progress-wrapper">
                        <div className="progress progress-md">
                          <div
                            className={classnames("progress-bar", {
                              goodRating: post.avgrating > 7,
                              medRating:
                                post.avgrating > 5 && post.avgrating <= 7,
                              badRating: post.avgrating <= 5
                            })}
                            role="progressbar"
                            aria-valuenow={74}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: post.avgrating * 10 + "%" }}
                          />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "Roboto",
                          textAlign: "right",
                          paddingTop: "1px",
                          fontWeight: "600"
                        }}
                      >
                        {" " + post.avgrating + "%"}
                      </span>
                    </div>
                  </CardBody>
                </Card>
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

DoctorsList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(DoctorsList);
