import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import signUp from '../mutations/Signup';
import currentUser from '../queries/CurrentUser';

class SignupForm extends Component {
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
        <h4> Sign Up </h4>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(signUp)(
  graphql(currentUser)(SignupForm)
);