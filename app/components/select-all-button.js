import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  actions: {

    toggleSelectedAll(){
      if (this.get('noneSelected') === false || this.get('anySelected') === true){
        this.set('noneSelected', true);
        this.set('allSelected', false);
        this.set('anySelected', false);
        this.get('model').forEach((e) => {
          Ember.set(e, 'selected', false);
        })
      } else {
        this.set('noneSelected', false);
        this.set('allSelected', true);
        this.set('anySelected', true);
        this.get('model').forEach((e) => {
          Ember.set(e, 'selected', true);
        })      }
    }

  }
});
