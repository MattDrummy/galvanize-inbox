import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  noneSelected: false,
  anySelected: true,
  showComposeMessage: false,
  unreadMessages: Ember.computed(countUnreadMessages),
  numberSelected: Ember.computed(countSelectedMessages),

  actions: {

    toggleStarred(i){
      toggleBoolProperty(this.get('model')[i-1], 'starred')
    },

    toggleComposeMessage(){
      toggleParentProperty(this, 'showComposeMessage')
    },

    toggleSelectedAll(){
      if (this.get('noneSelected') === false || this.get('anySelected') === true){
        selectAllOn(this);
      } else {
        selectAllOff(this);
      }
    },

    selectSingleMessage(id){
      toggleBoolProperty(this.get('model')[id-1], 'selected')
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

    openMessage(id){
      Ember.set(this.get('model')[id-1], 'read', true);
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
      
    },

    markAsRead(){
      let messagesArray = returnSelectedMessages(this)
      setPropertyForEach(messagesArray, 'read', true)
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
    },

    markAsUnread(){
      let messagesArray = returnSelectedMessages(this)
      setPropertyForEach(messagesArray, 'read', false)
      let unread = this.get('model').filter(function(e){
        return e.read === false;
      }).length;
      this.set('unreadMessages', unread);
    },

    applyLabel(event){
      let label = event.srcElement.value;
      let messagesArray = returnSelectedMessages(this);
      messagesArray.forEach((e) => {
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
      let messagesArray = returnSelectedMessages(this)
      messagesArray.forEach((e) => {
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

function countUnreadMessages(){
  return this.get('model').filter(function(e){
    return e.read === false;
  }).length;
}

function countUnreadMessages(){
  return this.get('model').filter(function(e){
    return e.read === false;
  }).length;
}
function countSelectedMessages(){
  return this.get('model').filter(function(e){
    return e.selected === true;
  }).length;
}

function selectAllOn(that) {
  that.set('allSelected', false);
  that.set('noneSelected', true);
  that.set('anySelected', false);
  that.get('model').forEach((e) => {
    Ember.set(e, 'selected', false);
  })
}

function selectAllOff(that){
  that.set('noneSelected', false);
  that.set('allSelected', true);
  that.set('anySelected', true);
  that.get('model').forEach((e) => {
    Ember.set(e, 'selected', true);
  })
}

function toggleBoolProperty(object, property) {
  if (object[property] === true){
    Ember.set(object, property, false);
  } else {
    Ember.set(object, property, true);
  }
}

function toggleParentProperty(that, property) {
  if (that.get(property) === true) {
    that.set(property, false);
  } else {
    that.set(property, true);
  }
}

function returnSelectedMessages(that){
  return that.get('model').filter((e) => {
    return e.selected === true;
  })
}

function setPropertyForEach(array, property, value){
  return array.forEach((e) => {
    Ember.set(e, property, value);
  });
}
