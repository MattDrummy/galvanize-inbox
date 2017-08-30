import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  actions: {

    applyLabel(event){
      let label = event.srcElement.value;
      let messagesArray = this.get('model').filter((e) => {
        return e.selected === true;
      });
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
      let messagesArray = this.get('model').filter((e) => {
        return e.selected === true;
      });
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
