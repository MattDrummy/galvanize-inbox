import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  noneSelected: false,
  anySelected: true,
  showComposeMessage: false,
  unreadMessages: Ember.computed(function(){
    return this.get('model').filter(function(e){
      return e.read === false;
    }).length;
  }),
  numberSelected: Ember.computed(function(){
    return this.get('modal').filter(function(e){
      return e.selected === true;
    }).length;
  }),
  actions: {
    toggleStarred(i){
      if (this.get('model')[i-1].starred === true) {
        Ember.set(this.get('model')[i-1], 'starred', false)
      } else {
        Ember.set(this.get('model')[i-1], 'starred', true)
      }
    },
    toggleComposeMessage(){
      if (this.get('showComposeMessage') === true) {
        this.set('showComposeMessage', false);
      } else {
        this.set('showComposeMessage', true);
      }
    },
    toggleSelectedAll(){
      if (this.get('noneSelected') === false || this.get('anySelected') === true){
        this.set('allSelected', false);
        this.set('noneSelected', true);
        this.set('anySelected', false);
        for (var i = 0; i < this.get('model').length; i++) {
          Ember.set(this.get('model')[i], 'selected', false);
        }
      } else {
        this.set('noneSelected', false);
        this.set('allSelected', true);
        this.set('anySelected', true);
        for (var i = 0; i < this.get('model').length; i++) {
          Ember.set(this.get('model')[i], 'selected', true);
        }
      }
    }
  }

});
