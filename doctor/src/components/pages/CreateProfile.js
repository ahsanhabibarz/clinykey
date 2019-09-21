import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete"; // getSelection // geocodeByAddress,
import PropTypes from "prop-types";
import { updateUserProfile } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import { categories } from "../../utils/categories";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      gender: "",
      category: "",
      specializations: "",
      education: "",
      designation: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {}

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
    const user = this.props.auth.user;
    let profileContents;

    if (this.props.auth.isAuthenticated && !this.props.docprofile.loading) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profile</span>
              <h3 className="page-title">Create Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
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
                              defaultValue={"key will be auto generated"}
                              divClass="form-group col-md-6"
                              labelHtmlFor="feKey"
                              disabled="disabled"
                            />
                            <TextFieldGroup
                              placeholder="Example : 01614390717"
                              id="fePhone"
                              label="Phone"
                              name="phone"
                              defaultValue={this.state.phone}
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
                                <option value="DEFAULT">Choose</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feInputCity">Category</label>
                              <select
                                id="feInputCategory"
                                defaultValue={"Choose"}
                                className="form-control"
                                name="category"
                                onChange={this.onChange}
                              >
                                <option value="DEFAULT">{"Choose"}</option>
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
                                defaultValue=""
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
                                defaultValue={""}
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
                                defaultValue={""}
                                placeholder="Exp: House#321 Road 18"
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Create Profile
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
    } else if (
      !this.props.auth.isAuthenticated &&
      !this.props.docprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-12 text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profile</span>
              <h3 className="page-title">Connect With Facebook First</h3>
            </div>
          </div>
        </div>
      );
    } else if (this.props.docprofile.loading) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }
    return profileContents;
  }
}

CreateProfile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { updateUserProfile }
)(withRouter(CreateProfile));
