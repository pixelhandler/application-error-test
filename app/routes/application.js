import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.ajax({url: 'api/session', method: 'GET'});
  }
});
