import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './methods.js';
import validator from 'validator';

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


Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
    });
    ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '871789127084481',
    secret: 'fee9d9e401066b4613bb9297f0f88079'
    });
    
  /* Email Server Config */
  smtp = {
    username: 'web25789746p1',
    password: 'asdFqweR#2612009',
    server: 'alfa3074.alfahosting-server.de',
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});


/* 
Collections
*/
Products = new Mongo.Collection('products');
ProductImages = new FilesCollection({ collectionName: 'ProductImages'});
