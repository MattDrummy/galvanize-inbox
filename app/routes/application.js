import Ember from 'ember';

let data = [
    {
      "id": 1,
      "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      "read": false,
      "starred": true,
      "selected": false,
      "labels": ["dev", "personal"],
      "body": "This is the message for id 1"
    },
    {
      "id": 2,
      "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      "read": false,
      "starred": false,
      "selected": true,
      "labels": [],
      "body": "This is the message for id 2"

    },
    {
      "id": 3,
      "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
      "read": false,
      "starred": true,
      "selected": false,
      "labels": ["dev"],
      "body": "This is the message for id 3"

    },
    {
      "id": 4,
      "subject": "We need to program the primary TCP hard drive!",
      "read": true,
      "starred": false,
      "selected": true,
      "labels": [],
      "body": "This is the message for id 4"

    },
    {
      "id": 5,
      "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
      "read": false,
      "starred": false,
      "selected": false,
      "labels": ["personal"],
      "body": "This is the message for id 5"

    },
    {
      "id": 6,
      "subject": "We need to back up the wireless GB driver!",
      "read": true,
      "starred": true,
      "selected": false,
      "labels": [],
      "body": "This is the message for id 6"

    },
    {
      "id": 7,
      "subject": "We need to index the mobile PCI bus!",
      "read": true,
      "starred": false,
      "selected": false,
      "labels": ["dev", "personal"],
      "body": "This is the message for id 7"

    },
    {
      "id": 8,
      "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
      "read": true,
      "starred": true,
      "selected": false,
      "labels": [],
      "body": "This is the message for id 8"

    }
  ]

export default Ember.Route.extend({
  model(){ return data }
});
