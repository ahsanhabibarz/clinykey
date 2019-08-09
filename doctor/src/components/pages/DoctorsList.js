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
                  <div className="card-post__image">
                    <div>
                      <Link to={`/doctor/${post.oid}`}>
                        <div>
                          <img
                            className="rounded-circle docProfileImage"
                            src={post.picture}
                            alt=""
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <h6 className="card-title mb-2 font-weight-bold">
                            {post.name}
                          </h6>
                        </div>
                      </Link>
                    </div>
                    <div
                      style={{ textAlign: "center", marginBottom: ".512rem" }}
                    >
                      <Badge pill className={` bg-${"dark"}`}>
                        {post.category}
                      </Badge>
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: ".512rem",
                        marginLeft: ".384rem"
                      }}
                    >
                      <Link to={`/doctor/${post.oid}`}>
                        <button
                          type="button"
                          className="mb-2 btn button-appointment mr-2"
                        >
                          View Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                  <CardBody>
                    <div>
                      <p className="card-text d-inline-block mb-1">
                        {post.education}
                      </p>
                    </div>
                    <div>
                      <p className="card-text d-inline-block mb-2">
                        {post.designation}
                      </p>
                    </div>

                    <div>
                      <div>
                        <p className="card-text text-danger font-weight-bold mb-0">
                          {post.chambers[0].name +
                            " - " +
                            post.chambers[0].location}
                        </p>
                        <div>
                          {post.chambers[0].days.map((day, id) => (
                            <span key={id} className="card-text mb-0 days">
                              {day.substring(0, 3) + " "}
                            </span>
                          ))}
                          <div>
                            <p className="mr-2 mb-0 card-text time">
                              {post.chambers[0].from > 12
                                ? post.chambers[0].from - 12 + " PM"
                                : post.chambers[0].from + " AM"}{" "}
                              -{" "}
                              {post.chambers[0].to > 12
                                ? post.chambers[0].to - 12 + " PM"
                                : post.chambers[0].to + " AM"}
                            </p>{" "}
                          </div>
                          <div>
                            <span className="card-text mb-0 taka">
                              {post.chambers[0].fee + " Taka"}
                            </span>
                            {post.chambers[1] ? (
                              <Link
                                className="ml-3 more"
                                to={`/doctor/${post.oid}`}
                              >
                                <i
                                  className="material-icons more"
                                  datatoggle="tooltip"
                                  title="More chambers"
                                >
                                  more
                                </i>
                              </Link>
                            ) : (
                              ""
                            )}
                            <div>
                              <span className="card-text mb-0 days">
                                {"Rating-" + post.avgrating + " "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="progress-wrapper"
                      // style={{
                      //   width: "100%",
                      //   bottom: ".256rem",
                      //   marginLeft: ".512rem",
                      //   marginRight: ".512rem"
                      // }}
                    >
                      <div className="progress progress-md">
                        <div
                          className={classnames("progress-bar", {
                            goodRating: post.avgrating > 6,
                            badRating: post.avgrating <= 6
                          })}
                          role="progressbar"
                          aria-valuenow={74}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: post.avgrating * 10 + "%" }}
                        />
                      </div>
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
