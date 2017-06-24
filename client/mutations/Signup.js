import graphql from 'graphql-tag';

export default graphql`
  mutation Signup($email: String, $password: String){
    signup(email:$email, password:$password) {
      email
      id
    }
  }
`;