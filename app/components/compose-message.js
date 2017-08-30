import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  className: ['form-horizontal', 'well'],

  actions: {
    test(){
      this.sendAction('anything')
    }
  }
});
