export default {
  saveToken: function(token) {
    window.localStorage['fullstackreact-token'] = token;
  },
  getToken: function() {
    return window.localStorage['fullstackreact-token'];
  },
  removeToken: function() {
    window.localStorage.removeItem('fullstackreact-token');
  },
  isLoggedIn: function() {
    var token = this.getToken();
    return token ? true : false;
  },
  currentUser: function() {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      try {
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload._doc;
      } catch(err) {
        return false;
      }
    }
  }
}