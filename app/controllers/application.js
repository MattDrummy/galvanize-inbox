import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  noneSelected: false,
  anySelected: true,
  showComposeMessage: false,
  noMessages: false,

  unreadMessages: Ember.computed(countUnreadMessages),
  numberSelected: Ember.computed(countSelectedMessages),

  actions: {

    toggleStarred(i){
      toggleBoolProperty(this.get('model')[i-1], 'starred')
    },

    selectSingleMessage(id){
      toggleBoolProperty(this.get('model')[id-1], 'selected')
      let selectedMessages = this.get('model').filter(function(e){
        return e.selected === true;
      }).length;
      checkSelectedState(selectedMessages, this)
    },

    openMessage(id){
      Ember.set(this.get('model')[id-1], 'read', true);
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
    },

    deleteMessages(){
      let messagesArray = returnSelectedMessages(this);
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
        checkSelectedState(selectedMessages, this)
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

function checkSelectedState(selectedMessages, that) {
  if (selectedMessages === 0) {
    that.set('noneSelected', true);
    that.set('anySelected', false);
    that.set('allSelected', false);
  } else if (selectedMessages < that.get('model').length) {
    that.set('allSelected', false);
    that.set('noneSelected', false);
    that.set('anySelected', true);
  } else {
    that.set('allSelected', true);
    that.set('anySelected', true);
    that.set('noneSelected', false);
  }
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
