import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  actions: {

    toggleStarred(){
      if (this.get('message').starred === true){
        Ember.set(this.get('message'), 'starred', false);
      } else {
        Ember.set(this.get('message'), 'starred', true);
      }
    },

    selectSingleMessage(){
      toggleBoolProperty(this.get('message'), 'selected')
      let selectedMessages = this.get('model').filter(function(e){
        return e.selected === true;
      }).length;
      if (selectedMessages === 0) {
        this.set('noneSelected', true);
        this.set('anySelected', false);
        this.set('allSelected', false);
      } else if (selectedMessages < this.get('model').length) {
        this.set('allSelected', false);
        this.set('noneSelected', false);
        this.set('anySelected', true);
      } else {
        this.set('allSelected', true);
        this.set('anySelected', true);
        this.set('noneSelected', false);
      }
    },

    openMessage(){
      Ember.set(this.get('message'), 'read', true);
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
    }

  }
});

function toggleBoolProperty(object, property) {
  if (object[property] === true){
    Ember.set(object, property, false);
  } else {
    Ember.set(object, property, true);
  }
}
