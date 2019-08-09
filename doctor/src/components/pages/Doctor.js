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
              <h3 className="page-title">{this.state.profile.name}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-small mb-4 pt-2">
                <div className="card-header border-bottom text-center">
                  <div className="mb-3 mx-auto">
                    <img
                      className="rounded-circle"
                      src={this.state.profile.picture}
                      alt=""
                      width={110}
                      height={110}
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </div>
                  <h5 className="text-danger d-block mb-2">
                    Assistant Professor
                  </h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-4">
                    <div className="progress-wrapper">
                      <strong className="text-dark d-block mb-2">Rating</strong>
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
                          <span className="progress-value text-dark font-weight-bold">
                            {this.state.profile.avgrating * 10 + "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item px-4 pb-3">
                    <i
                      className="material-icons myicons mr-2 pt-1"
                      datatoggle="tooltip"
                      title="Email"
                    >
                      email
                    </i>
                    <span className="text-dark mdweight">
                      {this.state.profile.email}
                    </span>
                  </li>
                  <li className="list-group-item px-4 pb-4">
                    <i
                      className="material-icons myicons mr-2 pt-1"
                      datatoggle="tooltip"
                      title="Phone"
                    >
                      phone
                    </i>
                    <span className="text-dark mdweight">
                      {this.state.profile.phone}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card card-small mb-4 pt-1">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-4">
                    <strong className="text-dark d-block mb-1">Key</strong>
                    <span className="text-dark mdweight">
                      {this.state.profile.key}
                    </span>
                  </li>{" "}
                  <li className="list-group-item px-4">
                    <strong className="text-dark d-block mb-1">Category</strong>
                    <span className="text-dark mdweight">
                      {this.state.profile.category}
                    </span>
                  </li>{" "}
                  <li className="list-group-item px-4">
                    <strong className="text-dark d-block mb-1">
                      Education
                    </strong>
                    <span className="text-dark mdweight">
                      {this.state.profile.education}
                    </span>
                  </li>
                  <li className="list-group-item px-4">
                    <strong className="text-dark d-block mb-1">
                      Designation
                    </strong>
                    <span className="text-dark mdweight">
                      {this.state.profile.designation}
                    </span>
                  </li>
                  <li className="list-group-item px-4">
                    <strong className="text-dark d-block mb-1">
                      Specializations
                    </strong>
                    <span className="text-dark mdweight">
                      {this.state.profile.specializations}
                    </span>
                  </li>
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
                      <span
                        className="text-dark text-bold mdweight primary"
                        style={{ fontSize: "1.256rem", fontWeight: 700 }}
                      >
                        {post.name}
                      </span>
                    </li>{" "}
                    <li className="list-group-item px-4">
                      <strong className="text-dark d-block mb-2">
                        Location
                      </strong>
                      <span className="text-dark mdweight">
                        {post.area + " " + post.city}
                      </span>
                    </li>
                    <li className="list-group-item px-4">
                      <strong className="text-dark d-block mb-2">
                        Address
                      </strong>
                      <span className="text-dark mdweight">{post.address}</span>
                    </li>
                    <li className="list-group-item px-4">
                      {post.days.map((day, id) => (
                        <strong key={id} className="text-dark font-weight-bold">
                          {day + " "}
                        </strong>
                      ))}
                      <div className="mt-2">
                        <span className="text-dark mdweight">
                          {post.from > 12
                            ? post.from - 12 + " PM"
                            : post.from + " AM"}{" "}
                          -{" "}
                          {post.to > 12
                            ? post.to - 12 + " PM"
                            : post.to + " AM"}
                        </span>
                      </div>
                    </li>
                    <li className="list-group-item px-4">
                      <span className="text-dark mdweight">
                        {post.fee + " Taka"}
                      </span>
                    </li>
                    {Object.keys(this.state.appointment).length > 0 ? (
                      <li className="list-group-item px-4">
                        <strong className="text-dark d-block mb-2">
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
                                      backgroundImage: `url(${
                                        this.props.auth.user.picture
                                      })`
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
                        <span className="text-danger font-weight-bold">
                          No Appointments
                        </span>
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
