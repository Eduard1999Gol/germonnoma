import { ReactiveVar } from 'meteor/reactive-var'
import Toast from '../lib/costumFunctions/toast';


Template.EditProductPage.onCreated(function(){
    Session.set('selectedFile', "");
    this.newProduct = new ReactiveVar({
        category: "",
        name: "",
        price: "",
        description: "",
        image: Session.get("image")
    });
    this.newProductImage = new ReactiveVar();

});

Template.EditProductPage.onRendered(function(){
});


Template.EditProductPage.events({
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
            image: product.image
        });
        console.log(product.image);     
    },

    'change select#product_category_select': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: event.currentTarget.value,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image
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
            image: product.image
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
            image: product.image
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

    "click button#editProductForm": function (event) {
        event.preventDefault();
        var template =  Template.instance();
        var newProduct = template.newProduct.get();
        var product = {
            category: template.newProduct.get().category,
            name: template.newProduct.get().name,
            price: template.newProduct.get().price,
            description: template.newProduct.get().description,
            image: template.newProduct.get().image
        }
        var id = Session.get("id");
        Meteor.call('updateProduct', id, product, function (err, res) {
            if (!err) {
                Toast({
                    text: "Product is edited", 
                    duration: 3000, 
                    color: "success"
                });

            }
             else {
                Toast({
                    text: "Product is not edited", 
                    duration: 3000, 
                    color: "danger"
                });
                
            }

        })
    },
});


Template.EditProductPage.helpers({
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

