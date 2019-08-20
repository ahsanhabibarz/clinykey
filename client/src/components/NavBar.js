import React, { Component } from "react";
import { OpenNav } from "../actions/navActions";
import { loginUser, logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import classnames from "classnames";
import PropTypes from "prop-types";
import { getProfilesBySearch } from "../actions/profileAction";
import { suggestions } from "../utils/suggestions";

///
import Autosuggest from "react-autosuggest";

///

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suggestions.filter(
        lang => lang.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.toLowerCase()}</div>;

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDown: false,
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: "",
      search: "",
      profile: null,
      errors: {},
      ///
      value: "",
      suggestions: [],
      voice: "",
      recording: false,
      notsupported: false
    };

    this.onClick = this.onClick.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onVoice = this.onVoice.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {}

  responseFacebook = response => {
    try {
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      });

      const userData = {
        name: this.state.name,
        oid: this.state.userID,
        email: this.state.email,
        picture: this.state.picture,
        mykey: "hello"
      };

      this.props.loginUser(userData, this.props.history, this.props.location);
    } catch (err) {
      //window.location.href = "/";
    }
  };

  onClick() {
    this.props.OpenNav();
  }

  /////
  onChangex = (event, { newValue }) => {
    this.setState({
      value: newValue,
      search: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onVoice() {
    let transcript = null;
    let state = this;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    try {
      const recognition = new SpeechRecognition();

      recognition.onstart = function() {
        state.setState({ recording: true });
      };
      recognition.onresult = function(event) {
        const current = event.resultIndex;
        transcript = event.results[current][0].transcript;
        state.setState({
          value: transcript,
          search: transcript,
          recording: false
        });

        let path = state.props.location.pathname;
        if (path === "/") {
          state.props.getProfilesBySearch(state.state.search);
        }
      };

      recognition.onsoundend = function() {
        state.setState({
          recording: false
        });
      };
      recognition.onspeechend = function() {
        state.setState({
          recording: false
        });
      };
      recognition.onaudioend = function() {
        state.setState({
          recording: false
        });
      };

      recognition.start();
    } catch (err) {
      state.setState({ notsupported: true });
    }
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onClear() {
    this.setState({ value: "", search: "" });
    let path = this.props.location.pathname;
    if (path === "/") {
      this.props.getProfilesBySearch("");
    }
  }

  onSearch(e) {
    e.preventDefault();
    let path = this.props.location.pathname;
    if (path === "/") {
      this.props.getProfilesBySearch(this.state.search);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLogout() {
    this.props.logoutUser(this.props.history);
  }

  dropDown() {
    this.setState(state => ({
      isDown: !state.isDown
    }));
  }

  render() {
    let fbContent;

    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search . . .",
      value,
      onChange: this.onChangex
    };

    if (this.props.auth.isAuthenticated) {
      fbContent = (
        <li
          onClick={this.dropDown}
          className={classnames("nav-item dropdown", {
            show: this.state.isDown,
            hidden: !this.state.isDown
          })}
        >
          <Link
            to="#"
            className="nav-link dropdown-toggle text-nowrap px-3"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded={this.state.isDown}
          >
            <img
              className="user-avatar rounded-circle mr-2"
              src={this.props.auth.user.picture}
              alt={this.props.auth.user.name}
            />
            <span
              className="d-none d-md-inline-block "
              style={{ fontWeight: "700", color: "black" }}
            >
              {this.props.auth.user.name}
            </span>
          </Link>
          <div
            className={classnames("dropdown-menu dropdown-menu-small", {
              show: this.state.isDown,
              hidden: !this.state.isDown
            })}
            style={{ display: this.state.isDown ? "block" : "none" }}
          >
            <a
              className="dropdown-item font-weight-normal"
              href="user-profile-lite.html"
            >
              <i className="material-icons"></i> Profile
            </a>
            <a
              className="dropdown-item font-weight-normal"
              href="components-blog-posts.html"
            >
              <i className="material-icons">vertical_split</i> Blog Posts
            </a>
            <a
              className="dropdown-item font-weight-normal"
              href="add-new-post.html"
            >
              <i className="material-icons">note_add</i> Add New Post
            </a>
            <div className="dropdown-divider" />
            <Link
              to="#"
              onClick={this.onLogout}
              className="dropdown-item text-danger font-weight-normal"
            >
              <i className="material-icons text-danger"></i> Logout{" "}
            </Link>
          </div>
        </li>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="2335728843382570"
          autoLoad={false}
          fields="name,email,picture.width(250)"
          callback={this.responseFacebook}
        />
      );
    }

    return (
      <div className="main-navbar sticky-top bg-white">
        {/* Main Navbar */}
        <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
          <form
            onSubmit={this.onSearch}
            className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
          >
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text mainsearch">
                  <i className="fas fa-search" />
                </div>
              </div>
              <Autosuggest
                className="navbar-search form-control"
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                type="text"
                placeholder="Search for something..."
              />{" "}
              <div
                className={classnames("input-group-text", {
                  cros: this.state.search,
                  crosshide: this.state.search === ""
                })}
                onClick={this.onClear}
              >
                <i className="fas fa-times-circle" />
              </div>
            </div>
          </form>
          <ul className="navbar-nav border-left flex-row ">
            <li className="nav-item border-right dropdown notifications">
              <Link
                className="nav-link nav-link-icon text-center"
                to="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.notsupported ? (
                  <div
                    className="nav-link-icon__wrapper"
                    onClick={this.onVoice}
                  >
                    <i
                      className="fas fa-info-circle recording"
                      datatoggle="tooltip"
                      title="Browser Not Supported"
                    />
                  </div>
                ) : (
                  <div
                    className="nav-link-icon__wrapper"
                    onClick={this.onVoice}
                  >
                    <i
                      className={classnames("fas fa-microphone", {
                        recording: this.state.recording,
                        notrecording: !this.state.recording
                      })}
                    />
                  </div>
                )}
              </Link>
            </li>
            {fbContent}
          </ul>
          <nav className="nav">
            <Link
              onClick={this.onClick}
              to="#"
              className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
              data-toggle="collapse"
              data-target=".header-navbar"
              aria-expanded="false"
              aria-controls="header-navbar"
            >
              <i className="material-icons"></i>
            </Link>
          </nav>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  userprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav,
  auth: state.auth,
  errors: state.errors,
  userprofile: state.userprofile
});

export default connect(
  mapStateToProps,
  { OpenNav, loginUser, logoutUser, getProfilesBySearch }
)(withRouter(NavBar));
