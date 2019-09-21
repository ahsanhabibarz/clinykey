import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete"; // getSelection // geocodeByAddress,
import PropTypes from "prop-types";
import {
  updateUserProfile,
  getCurrentProfile
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

import { cities } from "../../utils/cities";
import TextFieldGroup from "../common/TextFieldGroup";
import Checkboxes from "../common/Checkboxes";
import Spinner from "../common/Spinner";
import Bmi from "../../utils/calculator";

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
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      this.props.getCurrentProfile(this.props.history, this.props.location);
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userprofile.profile) {
      this.setState({
        age: nextProps.userprofile.profile.age,
        phone: nextProps.userprofile.profile.phone,
        height: nextProps.userprofile.profile.height,
        weight: nextProps.userprofile.profile.weight,
        gender: nextProps.userprofile.profile.gender,
        bloodGroup: nextProps.userprofile.profile.bloodGroup,
        city: nextProps.userprofile.profile.city,
        address: nextProps.userprofile.profile.address,
        description: nextProps.userprofile.profile.description,
        area: nextProps.userprofile.profile.area,
        hypertension: nextProps.userprofile.profile.hypertension,
        hypotension: nextProps.userprofile.profile.hypotension,
        diabetic: nextProps.userprofile.profile.diabetic,
        smoker: nextProps.userprofile.profile.smoker
      });
    } else {
      this.setState({
        area: "",
        hypertension: false,
        hypotension: false,
        diabetic: false,
        smoker: false
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      age: this.state.age,
      phone: this.state.phone,
      area: this.state.area,
      gender: this.state.gender,
      bloodGroup: this.state.bloodGroup,
      height: this.state.height,
      weight: this.state.weight,
      city: this.state.city,
      address: this.state.address,
      description: this.state.description,
      hypertension: this.state.hypertension,
      hypotension: this.state.hypotension,
      diabetic: this.state.diabetic,
      smoker: this.state.smoker
    };

    this.props.updateUserProfile(userData);
  }

  render() {
    console.log("C");

    const user = this.props.auth.user;
    let userImage;
    const profile = this.props.userprofile.profile;
    let profileContents;
    let myarea = "asdasd";
    if (this.state.area !== undefined) {
      myarea = this.state.area;
    }

    if (this.props.auth.isAuthenticated) {
      userImage = user.picture;
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
      this.props.userprofile.profile === null ||
      this.props.userprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    } else {
      age = profile.age;
      phone = profile.phone;
      key = profile.key;
      gender = profile.gender;
      bloodGroup = profile.bloodGroup;
      height = profile.height;
      weight = profile.weight;
      city = profile.city;
      address = profile.address;
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-small mb-4 pt-3">
                <div className="card-header border-bottom text-center">
                  <div className="mb-2 mx-auto">
                    <img
                      className="rounded-circle"
                      src={userImage}
                      alt=""
                      width={96}
                      height={96}
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </div>
                  <h4 className="mb-2">{user.name}</h4>
                  <button
                    type="button"
                    className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"
                  >
                    <i className="material-icons mr-1">cached</i>Analysis
                  </button>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-4">
                    <span className="descriptionText">
                      Body Mass Index : {Bmi(weight, height)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
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
                            <TextFieldGroup
                              placeholder="Exp. 32"
                              id="feAge"
                              type="number"
                              label="Age"
                              name="age"
                              defaultValue={age}
                              divClass="form-group col-md-4"
                              labelHtmlFor="feAge"
                              onChange={this.onChange}
                            />
                            <div className="form-group col-md-4">
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
                            <div className="form-group col-md-4">
                              <label htmlFor="feInputBlood">Blood Group</label>
                              <select
                                id="feInputBlood"
                                defaultValue={"DEFAULT"}
                                className="form-control"
                                name="bloodGroup"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">{bloodGroup}</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-row">
                            <TextFieldGroup
                              placeholder="Exp. 5.6"
                              id="feHeight"
                              type="number"
                              name="height"
                              label="Height (Ft)"
                              defaultValue={height}
                              divClass="form-group col-md-6"
                              labelHtmlFor="feHeight"
                              onChange={this.onChange}
                            />
                            <TextFieldGroup
                              placeholder="Exp. 60"
                              id="feWeight"
                              type="number"
                              name="weight"
                              label="Weight (Kg)"
                              defaultValue={weight}
                              divClass="form-group col-md-6"
                              labelHtmlFor="feWeight"
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-4">
                              <label htmlFor="feInputCity">City</label>
                              <select
                                id="feInputCity"
                                defaultValue={"DEFAULT"}
                                className="form-control"
                                name="city"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">{city}</option>
                                {cities.map(function(name, index) {
                                  return <option key={index}>{name}</option>;
                                })}
                              </select>
                            </div>
                            <div className="form-group col-md-8">
                              <label htmlFor="feInputCity">Area</label>
                              <PlacesAutocomplete
                                value={myarea}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading
                                }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Search Places ...",
                                        className:
                                          "location-search-input form-control"
                                      })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                          ? "suggestion-item--active"
                                          : "suggestion-item";
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                          ? {
                                              backgroundColor: "#fafafa",
                                              cursor: "pointer"
                                            }
                                          : {
                                              backgroundColor: "#ffffff",
                                              cursor: "pointer"
                                            };
                                        return (
                                          <div
                                            {...getSuggestionItemProps(
                                              suggestion,
                                              {
                                                className,
                                                style
                                              }
                                            )}
                                          >
                                            <span>
                                              {suggestion.description}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="feInputAddress">Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="feInputAddress"
                              defaultValue={address}
                              onChange={this.onChange}
                              placeholder="Exp: House#321 Road 18"
                            />{" "}
                          </div>
                          <div className="form-row">
                            <Checkboxes
                              name="hypertension"
                              label="High Perssure"
                              onClick={this.onCheck}
                              checked={this.state.hypertension}
                            />
                            <Checkboxes
                              name="hypotension"
                              label="Low Perssure"
                              onClick={this.onCheck}
                              checked={this.state.hypotension}
                            />
                            <Checkboxes
                              name="diabetic"
                              label="Diabetic"
                              onClick={this.onCheck}
                              checked={this.state.diabetic}
                            />
                            <Checkboxes
                              name="smoker"
                              label="Smoker"
                              onClick={this.onCheck}
                              checked={this.state.smoker}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label htmlFor="feDescription">
                                Informations
                              </label>
                              <textarea
                                className="form-control"
                                name="description"
                                onChange={this.onChange}
                                rows={5}
                                value={this.state.description}
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
          </div>
        </div>
      );
    }
    return profileContents;
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userprofile: state.userprofile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateUserProfile }
)(withRouter(Profile));
