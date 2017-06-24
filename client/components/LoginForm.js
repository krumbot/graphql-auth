import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import logIn from '../mutations/Login';
import currentUser from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
     });
  }

  render() {
    return (
      <div>
        <h4> Log In </h4>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(logIn)(
  graphql(currentUser)(LoginForm)
);