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
        this.get('model').forEach((e) => {
          Ember.set(e, 'selected', false);
        })
      } else {
        this.set('noneSelected', false);
        this.set('allSelected', true);
        this.set('anySelected', true);
        for (let i = 0; i < this.get('model').length; i++) {
          Ember.set(this.get('model')[i], 'selected', true);
        }
      }
    },
    selectSingleMessage(id){
      if (this.get('model')[id-1].selected === true){
        Ember.set(this.get('model')[id-1], 'selected', false);
      } else {
        Ember.set(this.get('model')[id-1], 'selected', true);
      }
      let selectedMessages = this.get('model').filter((e) => {
        return e.selected === true;
      }).length

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
    openMessage(id){
      Ember.set(this.get('model')[id-1], 'read', true);
      let unread = this.get('model').filter((e) => {
        return e.read === false;
      }).length
      this.set('unreadMessages', unread);
    },
    markAsRead(){
      let selectedMessages = this.get('model').filter((e) => {
        return e.selected === true;
      })
      selectedMessages.forEach((e) => {
        Ember.set(e, 'read', true);
      });
      let unread = this.get('model').filter((e) => {
        return e.read === false;
      }).length
      this.set('unreadMessages', unread);

    },
    markAsUnread(){
      let selectedMessages = this.get('model').filter((e) => {
        return e.selected === true;
      })
      selectedMessages.forEach((e) => {
        Ember.set(e, 'read', false);
      });
      let unread = this.get('model').filter((e) => {
        return e.read === false;
      }).length
      this.set('unreadMessages', unread);

    },
    applyLabel(event){
      let label = event.srcElement.value;
      let selectedMessages = this.get('model').filter((e) => {
        return e.selected === true;
      })
      selectedMessages.forEach((e) => {
        if (!e.labels.includes(label)) {
          let result = [];
          e.labels.forEach((l) => {
            result.push(l)
          })
          result.push(label);
          Ember.set(e, 'labels', result.sort())
        }
      })
    },
    removeLabel(event){
      let label = event.srcElement.value;
      let selectedMessages = this.get('model').filter((e) => {
        return e.selected === true;
      })
      selectedMessages.forEach((e) => {
        if (e.labels.includes(label)){
          let result = [];
          e.labels.forEach((l) => {
            if (l !== label) {
              result.push(l)
            }
          })
          Ember.set(e, 'labels', result.sort())
        }
      })
    }
  }

});
