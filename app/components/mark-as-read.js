import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  actions: {
    markAsRead(){
      let messagesArray = this.get('model').filter((e) => {
        return e.selected === true;
      })
      messagesArray.forEach((e) => {
        Ember.set(e, 'read', true);
      });
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
    },

    markAsUnread(){
      let messagesArray = this.get('model').filter((e) => {
        return e.selected === true;
      })
      messagesArray.forEach((e) => {
        Ember.set(e, 'read', false);
      });
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
    }

  }
});
