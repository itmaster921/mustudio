'use strict';
// @flow
interface User {
  name: string;
  email: string;
  password: string;
}

export default class LoginController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {login: undefined};
  submitted = false;
  formLoading = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.errors.login = '';
    this.submitted = true;
    if (form.$valid) {
      this.formLoading = true;
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to dashboard
        this.$state.go('dashboard');
        this.formLoading = false;
      })
      .catch(err => {
        this.errors.login = err.message;
        this.formLoading = false;
      });
    }
  }
}
