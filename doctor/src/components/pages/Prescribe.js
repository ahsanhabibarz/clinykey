import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPatientProfile,
  getMedicinesSuggestion
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import Checkboxes from "../common/Checkboxes";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class Prescribe extends Component {
  constructor() {
    super();
    this.state = {
      medicinesList: [
        {
          name: "napa",
          morning: {
            quantity: 1,
            time: true
          },
          noon: {
            quantity: 1,
            time: true
          },
          night: {
            quantity: 1,
            time: true
          },
          duration: 30
        }
      ],
      medname: "",
      morning: false,
      dmorning: {},
      mquantity: 0,
      mtime: false,
      noon: false,
      dnoon: {},
      nquantity: 0,
      ntime: false,
      night: false,
      dnight: {},
      niquantity: 0,
      nitime: false,
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeMed = this.onChangeMed.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      if (e.target.name === "morning") {
        this.setState({ morning: !this.state.morning });
      } else if (e.target.name === "noon") {
        this.setState({ noon: !this.state.noon });
      } else if (e.target.name === "night") {
        this.setState({ night: !this.state.night });
      }
    }
  }

  onChangeMed(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length !== 0 && e.target.value.length < 6) {
      this.props.getMedicinesSuggestion(e.target.value);
      this.setState({ suggestions: this.props.patientprofile.meds });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  onCheck(e) {
    if (e.target.name === "morning") {
      this.setState({ morning: !this.state.morning });
    } else if (e.target.name === "noon") {
      this.setState({ noon: !this.state.noon });
    } else if (e.target.name === "night") {
      this.setState({ night: !this.state.night });
    }
    console.log(this.state);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.pid)
        this.props.getPatientProfile(this.props.match.params.pid);
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    let profileContents;
    let days = [1, 5, 7, 10, 15, 21, 30, 45, 60, 75, 90];

    if (
      this.props.patientprofile.profile === null ||
      this.props.patientprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    } else {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Prescription</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-small mb-4 pt-3">
                <div className="card-header border-bottom text-center">
                  <img
                    className="rounded-circle"
                    src={this.props.patientprofile.profile.picture}
                    alt=""
                    width={75}
                    height={75}
                    style={{ objectFit: "cover" }}
                  />{" "}
                  <h6 className="mb-0">
                    {this.props.patientprofile.profile.name}
                  </h6>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-3">
                    <strong
                      className="text-muted d-block"
                      style={{ fontSize: "14px" }}
                    >
                      Age : {this.props.patientprofile.profile.age}
                    </strong>
                  </li>
                  <li className="list-group-item p-3">
                    <strong
                      className="text-muted d-block"
                      style={{ fontSize: "14px" }}
                    >
                      Weight : {this.props.patientprofile.profile.weight}
                    </strong>
                  </li>
                  <li className="list-group-item p-3">
                    <strong
                      className="text-muted d-block"
                      style={{ fontSize: "14px" }}
                    >
                      Blood Group :{" "}
                      {this.props.patientprofile.profile.bloodGroup}
                    </strong>
                  </li>
                  <li className="list-group-item p-3">
                    <strong
                      className="text-muted d-block"
                      style={{ fontSize: "14px" }}
                    >
                      Blood Group :{" "}
                      {this.props.patientprofile.profile.bloodGroup}
                    </strong>
                  </li>
                  <li className="list-group-item p-3">
                    <strong className="text-muted d-block mb-2">
                      Informaition
                    </strong>
                    <span>{this.props.patientprofile.profile.description}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="card card-small p-4">
                    <form autoComplete="off">
                      <div className="form-row">
                        <label htmlFor="Medicine">Medicine</label>
                        <input
                          id="feName"
                          label="Medicine name"
                          type="text"
                          name="name"
                          list="medicines"
                          placeholder="Med"
                          className="form-control form-group col-md-12"
                          labelHtmlFor="feFirstName"
                          onChange={this.onChangeMed}
                          defaultValue={this.state.medname}
                          style={{ paddingLeft: ".875rem" }}
                        />
                        <datalist id="medicines">
                          {this.props.patientprofile.meds.map((med, id) => (
                            <option
                              className="list-group-item"
                              value={med.name}
                            ></option>
                          ))}
                        </datalist>

                        <div className="form-group col-md-4">
                          <label htmlFor="feInputCity">Days</label>
                          <select
                            id="feInputCity"
                            defaultValue={"DEFAULT"}
                            className="form-control"
                            name="city"
                            onChange={this.onChange}
                          >
                            <option value="DEFAULT">{7}</option>
                            {days.map(function(name, index) {
                              return <option key={index}>{name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <Checkboxes
                          name="morning"
                          label="Morning"
                          onClick={this.onCheck}
                          checked={this.state.morning}
                          onCheck={this.onKeyPress}
                        />
                        <div className="form-group col-md-5">
                          <select
                            id="feInputState"
                            defaultValue={"DEFAULT"}
                            className="form-control"
                            name="gender"
                            onChange={this.onChange}
                          >
                            <option value="DEFAULT">{1}</option>
                            <option>0.5</option>
                            <option>1</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Before Meal
                          </button>
                        </div>
                      </div>
                      <div className="form-row">
                        <Checkboxes
                          name="noon"
                          label="Noon"
                          onClick={this.onCheck}
                          checked={this.state.noon}
                        />
                        <div className="form-group col-md-5">
                          <select
                            id="feInputState"
                            defaultValue={"DEFAULT"}
                            className="form-control"
                            name="gender"
                            onChange={this.onChange}
                          >
                            <option value="DEFAULT">{1}</option>
                            <option>0.5</option>
                            <option>1</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Before Meal
                          </button>
                        </div>
                      </div>
                      <div className="form-row">
                        <Checkboxes
                          name="night"
                          label="Night"
                          onClick={this.onCheck}
                          checked={this.state.night}
                        />
                        <div className="form-group col-md-5">
                          <select
                            id="feInputState"
                            defaultValue={"DEFAULT"}
                            className="form-control"
                            name="gender"
                            onChange={this.onChange}
                          >
                            <option value="DEFAULT">{1}</option>
                            <option>0.5</option>
                            <option>1</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Before Meal
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-8">
                  {this.state.medicinesList.map((med, id) => (
                    <h1>{med.name}</h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return profileContents;
  }
}

Prescribe.propTypes = {
  getPatientProfile: PropTypes.func.isRequired,
  getMedicinesSuggestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  patientprofile: state.patientprofile
});

export default connect(
  mapStateToProps,
  { getPatientProfile, getMedicinesSuggestion }
)(withRouter(Prescribe));
