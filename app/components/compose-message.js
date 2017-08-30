import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    test() {
      this.get('this').set('noMessages', true)
    }
  }
});
