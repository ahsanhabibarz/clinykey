import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete"; // getSelection // geocodeByAddress,
import PropTypes from "prop-types";
import {
  updateUserProfile,
  getCurrentProfile,
  getProfileByOidChamber
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import { Collapse, Modal } from "shards-react";
import { cities } from "../../utils/cities";
import { categories } from "../../utils/categories";
import TextFieldGroup from "../common/TextFieldGroup";
import Checkboxes from "../common/Checkboxes";
import Spinner from "../common/Spinner";
import classnames from "classnames";
import TimeKeeper from "react-timekeeper";

class AddChamber extends Component {
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
      this.props.getProfileByOidChamber(
        this.props.auth.user.oid,
        this.props.history
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
              <h3 className="page-title">Add Chamber</h3>
            </div>
          </div>
          <div className="row p-4">
            <div className="card card-small col-12 mb-4">
              <div className="p-3" style={{ textAlign: "left" }}>
                <form>
                  <div className="form-row">
                    <TextFieldGroup
                      placeholder="Chamber"
                      id="feChamber"
                      label="Chamber"
                      name="chamber"
                      defaultValue={""}
                      divClass="form-group col-md-12"
                      labelHtmlFor="feChamber"
                      onChange={this.onChange}
                    />
                    <div className="form-group col-md-4">
                      <label htmlFor="feInputCity">City</label>
                      <select
                        id="feInputCity"
                        defaultValue={"DEFAULT"}
                        className="form-control"
                        name="city"
                        onChange={this.onChange}
                      >
                        <option value="DEFAULT">{"Choose..."}</option>
                        {cities.map(function(name, index) {
                          return <option key={index}>{name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="form-group col-md-8">
                      <label htmlFor="feInputCity">Area</label>
                      <PlacesAutocomplete
                        value={this.state.area}
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
                                className: "location-search-input form-control"
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
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="feInputAddress">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        id="feInputAddress"
                        defaultValue={this.state.address}
                        onChange={this.onChange}
                        placeholder="Exp: House#321 Road 18"
                      />{" "}
                    </div>

                    <Modal
                      open={this.state.displayTimepicker}
                      toggle={this.toggleTimekeeper}
                    >
                      {this.state.displayTimepicker ? (
                        <TimeKeeper
                          time={this.state.time}
                          onChange={this.handleTimeChange}
                          config={{
                            TIMEPICKER_BACKGROUND: "white",
                            DONE_BUTTON_COLOR: "#b00",
                            DONE_BUTTON_BORDER_COLOR: "#ededed",
                            TIME_DEFAULT_COLOR: "black",
                            TIME_SELECTED_COLOR: "#b00"
                          }}
                          onDoneClick={this.toggleTimekeeper}
                          switchToMinuteOnHourSelect={true}
                        />
                      ) : (
                        false
                      )}
                    </Modal>
                    <div className="form-group col-lg-4 col-sm-12">
                      <label htmlFor="feInputAddress">Start Time</label>
                      <input
                        type="text"
                        name="stime"
                        className="form-control"
                        id="feStartTime"
                        value={this.state.startTime}
                        onChange={this.onChange}
                        onClick={this.toggleTimeKeep}
                      />
                    </div>
                    <div className="form-group col-lg-4 col-sm-12">
                      <label htmlFor="feInputAddress">End Time</label>
                      <input
                        type="text"
                        name="etime"
                        className="form-control"
                        id="feStartTime"
                        value={this.state.endTime}
                        onChange={this.onChange}
                        onClick={this.toggleTimeKeep}
                      />
                    </div>
                    <div className="form-group col-lg-4 col-sm-12">
                      <label htmlFor="feInputAddress">Fee</label>
                      <input
                        type="text"
                        name="fee"
                        className="form-control"
                        id="feFee"
                        defaultValue={""}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="form-row">
                      <Checkboxes
                        name="hypertension"
                        label="Saturday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Sunday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Monday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Tuesday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Wednesday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Thrusday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                      <Checkboxes
                        name="hypertension"
                        label="Friday"
                        onClick={this.onCheck}
                        checked={this.state.hypertension}
                      />
                    </div>
                  </div>
                </form>
                <button type="button" className="btn btn-accent">
                  Save Chamber
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return profileContents;
  }
}

AddChamber.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  getProfileByOidChamber: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userprofile: state.userprofile,
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateUserProfile, getProfileByOidChamber }
)(withRouter(AddChamber));
