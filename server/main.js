import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './methods.js';
import validator from 'validator';
import './publish.js';
import './methods.js';

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: true
});

Accounts.emailTemplates.from = 'info@germonnoma.org';
Accounts.emailTemplates.siteName = 'Germonnoma';



Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl('resetpassword/' + token);
};

Accounts.emailTemplates.resetPassword.text = function(user, url) {
  return 'Someone (hopefully you) has requested to reset your password. Please visit ' + url + ' to reset your password.'; 
};

Accounts.urls.verifyEmail = function(token) {
  return Meteor.absoluteUrl('verifyEmail/' + token);
};

Accounts.validateLoginAttempt(function (options) {
  if (options.user.emails[0].verified === true) {
    return true;
  } else {
    throw new Meteor.Error("email_not_verified")
  }
});

Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: 'google'
    });
    ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: Meteor.settings.google_auth.clientId,
    secret: Meteor.settings.google_auth.secret
    });

  /* Email Server Config */
  /* smtp = {
    username: Meteor.settings.smtp.username,
    password: Meteor.settings.smtp.password,
    server: Meteor.settings.smtp.server,
    port: Meteor.settings.smtp.port
  };
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  console.log(process.env.MAIL_URL); */
  var countCats = Categories.find().count();
  var cats = ["electronics", "food", "garden", "toys", "books"];
  if (countCats == 0) {
    cats.forEach(cat => {
      Categories.insert({name: cat});
    });
  }
});


/* 
Collections
*/
Products = new Mongo.Collection('products');
ProductImages = new Mongo.Collection('ProductImages');
Orders = new Mongo.Collection('orders');
Stores = new Mongo.Collection("stores");
Categories = new Mongo.Collection("categories");
