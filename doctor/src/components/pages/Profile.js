import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateUserProfile,
  getProfileByOid
} from "../../actions/profileAction";
import { Link, withRouter } from "react-router-dom";
import { categories } from "../../utils/categories";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      gender: "",
      category: "",
      specializations: "",
      education: "",
      designation: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
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
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      phone: this.state.phone,
      gender: this.state.gender,
      category: this.state.category,
      education: this.state.education,
      designation: this.state.designation,
      specializations: this.state.specializations
    };

    this.props.updateUserProfile(
      userData,
      this.props.history,
      this.props.location
    );
  }

  render() {
    console.log("A");

    const user = this.props.auth.user;
    let userImage;
    let profileContents;
    let myarea = "asdasd";
    if (this.state.area !== undefined) {
      myarea = this.state.area;
    }

    if (this.props.auth.isAuthenticated) {
      userImage = this.props.auth.user.picture;
    } else {
      userImage = require("../../images/user.png");
    }

    let { phone, key, gender, city, avgrating } = "";

    if (
      this.props.docprofile.profiles === null ||
      Object.keys(this.props.docprofile.profiles).length === 0 ||
      this.props.docprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    } else {
      phone = this.props.docprofile.profiles[0].phone;
      gender = this.props.docprofile.profiles[0].gender;
      avgrating = this.props.docprofile.profiles[0].avgrating;
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="card card-small mb-4">
                <div
                  className="card-header border-bottom"
                  style={{
                    display: "flex"
                  }}
                >
                  <div>
                    <img
                      className="rounded-circle docProfileImage"
                      src={user.picture}
                      alt=""
                    />{" "}
                  </div>
                  <div
                    style={{
                      flexGrow: 9,
                      textAlign: "left",
                      marginLeft: "1rem"
                    }}
                  >
                    <label className="descriptionText m-0">
                      {"Rating : " + avgrating}
                    </label>
                    <div className="progress-wrapper">
                      <div className="progress progress-md">
                        <div
                          className={classnames("progress-bar", {
                            goodRating: avgrating > 7,
                            medRating: avgrating > 5 && avgrating <= 7,
                            badRating: avgrating <= 5
                          })}
                          role="progressbar"
                          aria-valuenow={74}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: avgrating * 10 + "%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-3">
                    <div className="row">
                      <div className="col">
                        <form>
                          <div className="form-row">
                            <TextFieldGroup
                              placeholder="Name"
                              id="feName"
                              label="Name"
                              name="name"
                              divClass="form-group col-md-6"
                              labelHtmlFor="feFirstName"
                              defaultValue={user.name}
                              disabled="disabled"
                            />
                            <TextFieldGroup
                              placeholder="Email"
                              id="feEmail"
                              type="email"
                              name="email"
                              label="Email"
                              divClass="form-group col-md-6"
                              labelHtmlFor="feEmailAddress"
                              defaultValue={user.email}
                              disabled="disabled"
                            />
                          </div>
                          <div className="form-row">
                            <TextFieldGroup
                              placeholder="Key will be generated on profile save"
                              id="feKey"
                              label="Key"
                              name="key"
                              defaultValue={key}
                              divClass="form-group col-md-6"
                              labelHtmlFor="feKey"
                              disabled="disabled"
                            />
                            <TextFieldGroup
                              placeholder="Example : 01614390717"
                              id="fePhone"
                              label="Phone"
                              name="phone"
                              defaultValue={phone}
                              divClass="form-group col-md-6"
                              labelHtmlFor="fePhone"
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feInputState">Gender</label>
                              <select
                                id="feInputState"
                                defaultValue={"DEFAULT"}
                                className="form-control"
                                name="gender"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">{gender}</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feInputCity">Category</label>
                              <select
                                id="feInputCategory"
                                defaultValue={
                                  this.props.docprofile.profiles[0].category
                                }
                                className="form-control"
                                name="category"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">
                                  {this.props.docprofile.profiles[0].category}
                                </option>
                                {categories.map(function(name, index) {
                                  return <option key={index}>{name}</option>;
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label htmlFor="feInputAddress">
                                Specializations
                              </label>
                              <input
                                type="text"
                                name="specializations"
                                className="form-control"
                                id="feInputAddress"
                                defaultValue={
                                  this.props.docprofile.profiles[0]
                                    .specializations
                                }
                                onChange={this.onChange}
                                placeholder="Exp: House#321 Road 18"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label htmlFor="feDescription">Education</label>
                              <input
                                type="text"
                                id="feInputEducation"
                                className="form-control"
                                name="education"
                                onChange={this.onChange}
                                defaultValue={
                                  this.props.docprofile.profiles[0].education
                                }
                                placeholder="Exp: House#321 Road 18"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label htmlFor="feDescription">Designation</label>
                              <input
                                type="text"
                                id="feInputDesignation"
                                className="form-control"
                                name="designation"
                                onChange={this.onChange}
                                defaultValue={
                                  this.props.docprofile.profiles[0].designation
                                }
                                placeholder="Exp: House#321 Road 18"
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Update Account
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              {this.props.docprofile.profiles[0].chambers.map(
                (chamber, key) => (
                  <div className="card card-small mb-4" key={key}>
                    <div style={{ textAlign: "left" }}>
                      <ul className="list-group list-group-flush">
                        <li
                          className="list-group-item px-3"
                          style={{ display: "flex" }}
                        >
                          <p key={key} style={{ width: "50%" }}>
                            <b>Chamber no: {key + 1}</b>
                          </p>
                          <Link
                            to="/addChamber"
                            style={{ width: "50%", textAlign: "right" }}
                          >
                            <i
                              className="fas fa-edit"
                              style={{
                                paddingTop: "3px"
                              }}
                            />
                          </Link>
                        </li>
                        <li className="list-group-item px-3">
                          <p>
                            <b>
                              Hospital: {chamber.name + "" + chamber.location}
                            </b>
                          </p>
                        </li>
                        <li className="list-group-item px-3">
                          <p>
                            <b>Address: {chamber.address} </b>
                          </p>
                        </li>
                        <li className="list-group-item px-3">
                          <p>
                            <b>
                              Days:{" "}
                              {chamber.days.map(
                                (day, keys) =>
                                  day.charAt(0).toUpperCase() +
                                  day.slice(1).toLowerCase() +
                                  " "
                              )}{" "}
                            </b>
                          </p>
                        </li>
                        <li className="list-group-item px-3">
                          <p>
                            <b style={{ marginRight: "1rem" }}>
                              {parseInt(chamber.from, 10) > 12
                                ? parseInt(chamber.from, 10) - 12 + " pm "
                                : chamber.from + " am"}{" "}
                              -{" "}
                              {parseInt(chamber.to, 10) > 12
                                ? parseInt(chamber.to, 10) - 12 + " pm"
                                : chamber.to + " am"}{" "}
                            </b>
                            <b>{"Fee: " + chamber.fee} </b>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              )}
              <Link to="/addchamber">
                <button
                  className="btn btn-accent"
                  style={{ width: "100%" }}
                  noValidate
                >
                  Add Chambers
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return profileContents;
  }
}

Profile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  getProfileByOid: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userprofile: state.userprofile,
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { updateUserProfile, getProfileByOid }
)(withRouter(Profile));
