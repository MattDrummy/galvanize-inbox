import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  noneSelected: false,
  anySelected: true,
  showComposeMessage: false,
  noMessages: false,
  unreadMessages: Ember.computed(function (){
    return this.get('model').filter(function(e){
      return e.read === false;
    }).length;
  }),
  numberSelected: Ember.computed(function(){
    return this.get('model').filter(function(e){
      return e.selected === true;
    }).length;
  }),

  actions: {
    controllerCheck(){
      console.log("TEST");
    }
  }
});
