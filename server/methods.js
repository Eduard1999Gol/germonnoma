import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';


function sendEmail(to, subject, text ) {
    Email.send({
        to: to,
        from: 'info@germonnoma.org',
        subject: subject,
        text: text
    });
}
  
Meteor.methods({
    register: function(language, first_name, last_name, email, password, type) {
        var user_exist = Meteor.users.find({'profile.email': email}).count();
        var user = {
            email: email,
            password: password,
            profile:{
                first_name: first_name,
                last_name: last_name,
                email: email,
                type: type,
                language: language
            }
        }
        if (user_exist == 0) {
            var userId = Accounts.createUser(user);
            if (userId) {
                return userId;
            }
            
        }else{
            return "This email Address is already registered";
        }
        
    },
    createProduct: function (product) {
        product["created_at"] = new Date();
        var id = Products.insert(product);
        if (id) {
            return id;
        }else{
            throw new Meteor.Error(502);
        }
    },
    deleteProduct: function (id) {
        Products.remove({_id: id});
    }
});