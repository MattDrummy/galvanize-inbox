import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  className: ['btn', 'btn-danger'],

  actions: {
    toggleComposeMessage(){
      if (this.get('showComposeMessage') === true) {
        this.set('showComposeMessage', false);
      } else {
        this.set('showComposeMessage', true);
      }
    }
  }
});
