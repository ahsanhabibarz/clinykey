import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Collapse } from "shards-react";
import { getProfileByOid } from "../../actions/profileAction";
import {
  getAppointments,
  setAppointment
} from "../../actions/appointmentActions";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

class Doctor extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
      appointment: null,
      open: false,
      chamber: null
    };

    this.onBook = this.onBook.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({
      open: !this.state.open,
      chamber: e.target.value
    });
  }

  componentDidMount() {
    if (this.props.match.params.oid) {
      this.props.getProfileByOid(this.props.match.params.oid);
      this.props.getAppointments(this.props.match.params.oid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.docprofile.profiles) {
      this.setState({
        profile: nextProps.docprofile.profiles[0],
        appointment: nextProps.appointment.appointments
      });
    } else {
      this.setState({
        profile: null,
        appointment: null
      });
    }
  }

  onBook(e) {
    this.props.setAppointment(this.props.match.params.oid, e.target.value);
    this.setState({
      open: false
    });
  }

  render() {
    let profileContents;

    if (this.state.profile && this.state.appointment) {
      console.log("Hello");

      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">
                Profile Overview
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card card-small mb-4 pt-2">
                <div
                  className="m-3 text-center"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15% 85%"
                  }}
                >
                  <div className="mx-auto" style={{ textAlign: "left" }}>
                    <img
                      className="rounded-circle"
                      src={this.state.profile.picture}
                      alt=""
                      width={"100%"}
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </div>
                  <div style={{ textAlign: "left", marginLeft: "1rem" }}>
                    <span className="headingText">
                      {this.state.profile.name}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      Assistant Professor
                    </span>
                    <span className="descriptionText d-block mb-0">
                      {"Email: " + this.state.profile.email}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      {"Phone: " + this.state.profile.phone}
                    </span>
                    <div className="progress-wrapper mb-2">
                      <span className="d-block mb-2 descriptionText">
                        Rating
                      </span>
                      <div className="progress progress-md">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={74}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: this.state.profile.avgrating * 10 + "%"
                          }}
                        >
                          <span className="progress-value text-dark">
                            {this.state.profile.avgrating * 10 + "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-small mb-4 pt-1">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Category :{" "}
                      </b>
                      {this.state.profile.category}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Designation :{" "}
                      </b>
                      {this.state.profile.designation}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Education :{" "}
                      </b>
                      {this.state.profile.education}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Specializations :{" "}
                      </b>
                      {this.state.profile.specializations}
                    </span>
                  </li>{" "}
                </ul>
              </div>
            </div>
          </div>
          <Row>
            {this.state.profile.chambers.map((post, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="card card-small mb-4 pt-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-4">
                      <span className="headingText primary">{post.name}</span>
                    </li>{" "}
                    <li className="list-group-item pb-2 pt-2 px-4">
                      <span
                        className="descriptionText d-block mb-0"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Location
                      </span>
                      <span className="descriptionText">
                        {post.area + " " + post.city}
                      </span>
                    </li>
                    <li className="list-group-item pb-2 pt-2 px-4">
                      <span
                        className="descriptionText d-block mb-0"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Address
                      </span>
                      <span className="descriptionText">{post.address}</span>
                    </li>
                    <li className="list-group-item pb-3 pt-3 px-4">
                      {post.days.map((day, id) => (
                        <span key={id} className="days mr-2">
                          {day.toUpperCase() + " "}
                        </span>
                      ))}
                      <div className="mt-2">
                        <span className="days mr-2">
                          {post.from > 12
                            ? post.from - 12 + " PM"
                            : post.from + " AM"}{" "}
                          -{" "}
                          {post.to > 12
                            ? post.to - 12 + " PM"
                            : post.to + " AM"}
                        </span>
                        <span className="days">{post.fee + " Taka"}</span>
                      </div>
                    </li>
                    {Object.keys(this.state.appointment).length > 0 ? (
                      <li className="list-group-item px-4">
                        <strong className="descriptionText d-block mb-2">
                          Current Serials
                        </strong>
                        <div className="row serialrow">
                          {this.state.appointment.map((apntmnt, id) => {
                            if (
                              this.props.auth.isAuthenticated &&
                              apntmnt.cid === post.cid &&
                              apntmnt.pid !== this.props.auth.user.oid
                            )
                              return (
                                <div style={{ paddingTop: ".16rem" }} key={id}>
                                  <span className="serial">{id + 1}</span>
                                </div>
                              );
                            else if (
                              this.props.auth.isAuthenticated &&
                              apntmnt.cid === post.cid &&
                              apntmnt.pid === this.props.auth.user.oid
                            )
                              return (
                                <div key={id}>
                                  <span
                                    className="card-post__author-avatar card-post__author-avatar--small"
                                    style={{
                                      backgroundImage: `url(${this.props.auth.user.picture})`
                                    }}
                                  />
                                </div>
                              );
                            else if (
                              !this.props.auth.isAuthenticated &&
                              apntmnt.cid === post.cid
                            )
                              return (
                                <div style={{ paddingTop: ".16rem" }} key={id}>
                                  <span className="serial">{id + 1}</span>
                                </div>
                              );
                            else return "";
                          })}
                        </div>
                      </li>
                    ) : (
                      <li className="list-group-item px-4">
                        <span className="descriptionText">No Appointments</span>
                      </li>
                    )}
                    <li className="list-group-item px-4">
                      <div style={{ textAlign: "right" }}>
                        {this.state.chamber === post.cid ? (
                          <Collapse open={this.state.open} className="mb-4">
                            <div
                              className="p-3 mt-3 border rounded"
                              style={{ textAlign: "left" }}
                            >
                              <h5 className="headingText">Confirmation</h5>
                              <span className="descriptionText">
                                Do you comfirm your appointment ?
                              </span>
                              <button
                                type="button"
                                className="btn button-appointment mt-3"
                                style={{ height: "1.675rem", display: "block" }}
                                onClick={this.onBook}
                                value={post.cid}
                              >
                                Confirm
                              </button>
                            </div>
                          </Collapse>
                        ) : (
                          <Collapse open={false} className="mb-4">
                            <div
                              className="p-3 mt-3 border rounded"
                              style={{ textAlign: "left" }}
                            >
                              <h5 className="text-dark mdweight">
                                Confirmation
                              </h5>
                              <span className="text-dark mdweight">
                                Do you comfirm your appointment ?
                              </span>
                              <button
                                type="button"
                                className="btn button-appointment mt-3"
                                style={{ height: "1.675rem", display: "block" }}
                                onClick={this.onBook}
                                value={post.cid}
                              >
                                Confirm
                              </button>
                            </div>
                          </Collapse>
                        )}
                        <button
                          type="button"
                          className="btn button-appointment"
                          style={{ height: "1.675rem" }}
                          onClick={this.toggle}
                          value={post.cid}
                        >
                          {this.state.open && this.state.chamber === post.cid
                            ? "Cancel Appopintment"
                            : "Book Appopintment"}
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </Row>
        </div>
      );
    } else {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }

    return profileContents;
  }
}

Doctor.propTypes = {
  getProfileByOid: PropTypes.func.isRequired,
  getAppointments: PropTypes.func.isRequired,
  setAppointment: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired,
  appointment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  docprofile: state.docprofile,
  appointment: state.appointment,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByOid, getAppointments, setAppointment }
)(withRouter(Doctor));
