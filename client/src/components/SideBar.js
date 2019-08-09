import React, { Component } from "react";
import classnames from "classnames";
import { OpenNav } from "../actions/navActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };

    this.onClick = this.onClick.bind(this);
    this.reload = this.reload.bind(this);
  }

  onClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));

    this.props.OpenNav();
  }

  reload() {
    window.location.href = "/";
  }

  render() {
    const isopen = this.props.nav;

    let path = this.props.location.pathname;

    return (
      <div>
        {/* Main Sidebar */}
        <aside
          className={classnames("main-sidebar col-12 col-md-3 col-lg-2 px-0", {
            open: isopen,
            closed: !isopen
          })}
        >
          <div className="main-navbar">
            <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
              <div className="d-table m-auto" onClick={this.reload}>
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  style={{ width: "120px" }}
                  src={require("../images/clinykey.svg")}
                  alt=""
                />
              </div>
              <Link
                className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                onClick={this.onClick}
                to="#"
              >
                <i className="material-icons"></i>
              </Link>
            </nav>
          </div>
          <form
            action="#"
            className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
          >
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search" />
                </div>
              </div>
              <input
                className="navbar-search form-control"
                type="text"
                placeholder="Search for something..."
                aria-label="Search"
              />{" "}
            </div>
          </form>
          <div className="nav-wrapper">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  className={classnames("nav-link", {
                    active: path === "/profile" || path === "/createprofile"
                  })}
                  to="/profile"
                >
                  <i className="material-icons">account_circle</i>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="add-new-post.html">
                  <i className="material-icons">note_add</i>
                  <span>Find Pharmacy </span>
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className={classnames("nav-link", {
                    active: path === "/prescriptions"
                  })}
                  to="/prescriptions"
                >
                  <i className="material-icons">view_module</i>
                  <span>My Prescriptions</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="tables.html">
                  <i className="material-icons">table_chart</i>
                  <span>My Medicines</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="user-profile-lite.html">
                  <i className="material-icons">person</i>
                  <span>Ambulance Service</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="errors.html">
                  <i className="material-icons">error</i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        {/* End Main Sidebar */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(
  mapStateToProps,
  { OpenNav }
)(withRouter(SideBar));
