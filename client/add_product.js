import { ReactiveVar } from 'meteor/reactive-var'
import Toast from './lib/costumFunctions/toast';

Template.AddProduct.onCreated(function(){
    Session.set('selectedFile', "");
    this.newProduct = new ReactiveVar({
        category: "",
        name: "",
        price: "",
        description: "",
        image: "https://bulma.io/images/placeholders/480x480.png"
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
            image: "https://bulma.io/images/placeholders/480x480.png"
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
            image: "https://bulma.io/images/placeholders/480x480.png"
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
            image: "https://bulma.io/images/placeholders/480x480.png"
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
            image: "https://bulma.io/images/placeholders/480x480.png"
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
                        Toast({
                            text: "Product is created", 
                            duration: 3000, 
                            color: "success"
                        });
                    Router.go('/');
                }else{
                    Toast({
                        text: "Product is not created", 
                        duration: 3000, 
                        color: "danger"
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


