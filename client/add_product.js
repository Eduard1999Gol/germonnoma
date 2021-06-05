import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';

Template.AddProduct.onCreated(function(){
    Session.set('selectedFile', "");
});

Template.AddProduct.onRendered(function(){
});


Template.AddProduct.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },
    
    'submit form#addProductForm':function (event) {
        event.preventDefault();
        var product = {
            category: event.target.category.value,
            name: event.target.product_name.value,
            price: event.target.product_price.value,
            description: event.target.product_description.value
        }
        Meteor.call('createProduct', product, function (err, res) {
            if (!err) {
                console.log(res); //erstmal erstellen wir product und von Methode als res bekommen wir erstellte product id
                /* wenn ich id habe dann kann ich direkt meine Image in ProductImage collection hochladen und danach toast zeigen */
                const upload = ProductImages.insert({
                    file: event.target.resume.files[0],
                    chunkSize: 'dynamic',
                    meta: {
                        product_id: res //hier benutze ich product id
                    }
                    }, false);
                    upload.on('end', function (error, fileObj) {
                    if (error) {
                        return error;
                    } else {
                        return true;
                    }
                    });
                    upload.start();
                toast({
                    message: TAPi18n.__('product_created'),
                    type: 'is-success',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true
                });
                Router.go('/');
            }else{
                toast({
                    message: TAPi18n.__('product_not_created'),
                    type: 'is-danger',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true
                });
            }
        });
    },
    'change input.file-input':function (event) {
        event.preventDefault();
        Session.set('selectedFile', event.target.files[0].name);
    },
});


Template.AddProduct.helpers({
  'selectedFile':function () {
      if (Session.get('selectedFile')) {
          return Session.get('selectedFile');
      } else {
        return "choose_picture";
      }
  }
        
});


