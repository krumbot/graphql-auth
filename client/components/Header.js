import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import currentUser from '../queries/CurrentUser';
import logOut from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div></div>;
    }
    if (user) {
      return (
        <li>
          <a onClick={() => this.onLogoutClick()}>Log Out</a>
        </li>
      );
    }
    return (
      <div>
        <li>
          <Link to="/signup">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login">
            Log In
          </Link>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logOut)(
  graphql(currentUser)(Header)
);