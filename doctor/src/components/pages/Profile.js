import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete"; // getSelection // geocodeByAddress,
import PropTypes from "prop-types";
import {
  updateUserProfile,
  getCurrentProfile,
  getProfileByOid
} from "../../actions/profileAction";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Modal } from "shards-react";
import { cities } from "../../utils/cities";
import { categories } from "../../utils/categories";
import TextFieldGroup from "../common/TextFieldGroup";
import Checkboxes from "../common/Checkboxes";
import Spinner from "../common/Spinner";
import classnames from "classnames";
import TimeKeeper from "react-timekeeper";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      name: "",
      email: "",
      picture: "",
      area: "asdsad",
      diabetic: false,
      hypertension: false,
      hypotension: false,
      phone: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      city: "",
      smoker: false,
      address: " ",
      description: "",
      bloodGroup: "",
      errors: {},
      open: false,
      stime: false,
      etime: false,
      startTime: "12:15 am",
      endTime: "12:15 am",
      displayTimepicker: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.toggleTimeKeep = this.toggleTimeKeep.bind(this);
    this.toggleTimekeeper = this.toggleTimekeeper.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  handleTimeChange(newTime) {
    if (this.state.stime) this.setState({ startTime: newTime.formatted });
    else if (this.state.etime) this.setState({ endTime: newTime.formatted });
  }

  toggleTimeKeep(e) {
    this.setState({
      displayTimepicker: !this.state.displayTimepicker,
      [e.target.name]: true
    });
    console.log(this.state.stime);
  }

  toggleTimekeeper() {
    this.setState({
      displayTimepicker: !this.state.displayTimepicker,
      stime: false,
      etime: false
    });
  }

  handleChange = area => {
    this.setState({ area });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSelect = area => {
    this.setState({ area });
    // geocodeByAddress(address)
    //   .then(results => getSelection(results[0]))
    //   .then(latLng => console.log("Success", latLng))
    //   .catch(error => console.error("Error", error));
  };

  onCheck(e) {
    if (e.target.name === "hypertension") {
      this.setState({ hypertension: !this.state.hypertension });
    } else if (e.target.name === "hypotension") {
      this.setState({ hypotension: !this.state.hypotension });
    } else if (e.target.name === "diabetic") {
      this.setState({ diabetic: !this.state.diabetic });
    } else if (e.target.name === "smoker") {
      this.setState({ smoker: !this.state.smoker });
    }
    console.log(this.state);
  }

  componentDidMount() {
    this.setState({ area: "" });

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

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      phone: this.state.phone,
      area: this.state.area,
      gender: this.state.gender,
      city: this.state.city,
      address: this.state.address
    };

    this.props.updateUserProfile(userData);
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

    let {
      age,
      phone,
      key,
      gender,
      bloodGroup,
      height,
      weight,
      city,
      address
    } = "";

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
      city = this.props.docprofile.profiles[0].city;
      address = this.props.docprofile.profiles[0].address;
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
                <div className="card-header border-bottom">
                  <h6 className="m-0">Account Details</h6>
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
                                id="feInputCity"
                                defaultValue={
                                  this.props.docprofile.profiles[0].category
                                }
                                className="form-control"
                                name="city"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">{city}</option>
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
                                name="address"
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
                                name="description"
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
                                name="description"
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
                  <div className="card card-small mb-4">
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
                              class="fas fa-edit"
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
  getCurrentProfile: PropTypes.func.isRequired,
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
  { getCurrentProfile, updateUserProfile, getProfileByOid }
)(withRouter(Profile));
