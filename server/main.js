import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './methods.js';
import validator from 'validator';

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: true
});

Accounts.onCreateUser((options, user) => {
  const newUser = user;
  if (validator.isEmail(options.email)) {
    return newUser;
  } else{
      throw new Meteor.Error('500', 'Please pass a valid email Address.')
  }
});

Meteor.startup(() => {

  /* Email Server Config */
  smtp = {
    username: 'web25789746p1',
    password: 'asdFqweR#2612009',
    server: 'alfa3074.alfahosting-server.de',
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});
