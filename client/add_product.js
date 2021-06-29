import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';
import { ReactiveVar } from 'meteor/reactive-var'

Template.AddProduct.onCreated(function(){
    Session.set('selectedFile', "");
    this.newProduct = new ReactiveVar({
        category: "",
        name: "",
        price: "",
        description: "",
        image: "https://bulma.io/images/placeholders/1280x960.png"
    });

    this.newProductImage = new ReactiveVar();

});

Template.AddProduct.onRendered(function(){
});


Template.AddProduct.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'change textarea#product_description_textarea': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: product.name,
            price: product.price,
            description: event.currentTarget.value,
            image: "/images/lego.jpeg"
        });
                
    },

    'change select#product_category_select': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: event.currentTarget.value,
            name: product.name,
            price: product.price,
            description: product.description,
            image: "/images/lego.jpeg"
        });
                
    },
      
    'keyup input#product_name_input': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: event.currentTarget.value,
            price: product.price,
            description: product.description,
            image: "/images/lego.jpeg"
        });
                
    },

    'keyup input#product_price_input': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: product.name,
            price: event.currentTarget.value,
            description: product.description,
            image: "/images/lego.jpeg"
        })
    },

    'change input.file-input': function (event) {
        event.preventDefault();
        Template.instance().newProductImage.set(event.currentTarget.files[0]);
        var reader = new FileReader();
        var template = Template.instance();
        var product = Template.instance().newProduct.get();
        reader.onload = function (e) {
            template.newProduct.set({
                category: product.category,
                name: product.name,
                price: product.price,
                description: product.description,
                image: e.target.result
            });
        };
        reader.readAsDataURL(event.currentTarget.files[0]);

        
    },

    'click button#addProductForm':function (event) {
        event.preventDefault();
        var template =  Template.instance();
        var newProduct = template.newProduct.get();
        if (newProduct.name != "" && newProduct.category != "" && newProduct.price != "" && newProduct.description != "" && template.newProductImage.get()) {
            var product = {
                category: template.newProduct.get().category,
                name: template.newProduct.get().name,
                price: template.newProduct.get().price,
                description: template.newProduct.get().description
            }
            Meteor.call('createProduct', product, function (err, res) {
                if (!err) {
                    const upload = ProductImages.insert({
                        file: template.newProductImage.get(),
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
                        var prod = Products.findOne({_id: res});
                        template.newProduct.set(prod)
                        //
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
        } else {
            alert("Die Felder müssen ausgefüllt werden!")
        }
        
    },
});


Template.AddProduct.helpers({
  'selectedFile':function () {
      if (Session.get('selectedFile')) {
          return Session.get('selectedFile');
      } else {
        return "choose_picture";
      }
  },

  'getNewProduct': function () {
    return Template.instance().newProduct.get();
  }
        
});


