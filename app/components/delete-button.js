import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  actions: {
    deleteMessages(){
      let messagesArray = this.get('model').filter((e) => {
        return e.selected === true;
      });
      messagesArray.forEach((e) => {
        Ember.set(e, 'deleted', true);
        Ember.set(e, 'read', true);
        Ember.set(e, 'selected', false);
        let unread = this.get('model').filter(function(e){
          return e.read === false;
        }).length;
        this.set('unreadMessages', unread);
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
      })
      let remainingMessages = this.get('model').filter((e) => {
        return e.deleted === false;
      }).length;
      if (remainingMessages === 0) {
        this.set('noMessages', true)
      }
    }
  }
});
