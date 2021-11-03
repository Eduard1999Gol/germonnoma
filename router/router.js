import  { uniq } from 'meteor/underscore'

Router.configure({
  layoutTemplate: "Layout",
  template: "Layout",
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render("Login");
  } else {
    this.next();
  }
},{
  except: ['register', 'verifyEmail', 'login', 'after_register', 'home', 'forgot_password',"reset_password_email","set_password_page"]
})


Router.route(
  "/",
  function () {
      this.render("Home");
  },
  {
    name: "home",
  }
);

Router.route(
  "/products/:_id",
  function () {
      this.render("ProductDetails");
  },
  {
    name: "productDetails"
  }
);

Router.route(
  "/products/search/:searchTerm",
  function () {
      this.render("SearchProducts");
  },
  {
    name: "searchedProducts",
    
  }
);


Router.route(
  "/addproduct",
  function () {
    if (!Meteor.userId()) {
      Router.go("home");
    } else 
      this.render("AddProduct");
  },
  {
    name: "addProduct",
  }
);

Router.route(
  "/register",
  function () {
      if (Meteor.userId() ){
        Router.go('home');
      } else {
        this.render("Register");
      }
  },
  {
    name: "register",
  }
);


Router.route(
  "/login",
  function () {
      if (Meteor.userId() ){
        Router.go('home');
      } else {
        this.render("Login");
      }
  },
  {
    name: "login",
  }
);


Router.route(
  "/my_profile/:_id",
  function () {
    if (!Meteor.userId()) {
      Router.go("home");
    } else {
      this.render("MyProfile");
      }
  },
  {
    name: "MyProfile",
  }
);


Router.route(
  "/my_basket",
  function () {
    if (!Meteor.userId()) {
      Router.go("home");
    } else 
      this.render("UserBasket");
  },
  {
    name: "basket_page",
  }
);

Router.route(
  "/my_orders",
  function () {
    if (!Meteor.userId()) {
      Router.go("home");
    } else 
      this.render("UserOrders");
  },
  {
    name: "orders_page",
  }
);

Router.route(
  "/my_store_orders",
  function () {
    if (!Meteor.userId()) {
      Router.go("home");
    } else 
      this.render("StoreOrders");
  },
  {
    name: "store_orders_page",
  }
);






Router.route(
  "/verifyEmail/:token",
  function () {
    var self = this;
    if (this.ready()) {
      Accounts.verifyEmail(this.params.token, function (err) {
        if(!err){
          self.render("VerifyEmail");
        }else{
          Router.go("login");
        }
      })
    } else {
      this.render("Loading");
    }
  },
  {
    name: "verifyEmail",
  }
);


Router.route(
  "/after_register",
  function () {
    if (this.ready()) {
      if (Meteor.userId() ){
        Router.go('home');
      } else {
        this.render("AfterRegister");
      }
    } else {
      this.render("Loading");
    }
  },
  {
    name: "after_register",
  }
);


Router.route(
  "/forgot_password",
  function () {
    if (this.ready()) {
      this.render("ForgotPassword");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "forgot_password",
  }
);

Router.route(
  "/reset_password_email",
  function () {
    if (this.ready()) {
      if (Meteor.userId() ){
        Router.go('home');
      } else {
        this.render("AfterResetPassword");
      }
    } else {
      this.render("Loading");
    }
  },
  {
    name: "reset_password_email",
  }
);


Router.route(
  "/resetpassword/:token",
  function () {
    var self = this;
    if (this.ready()) {
      this.render("SetPassword");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "set_password_page",
    data: function () {
      return {
        token: this.params.token
      }
    }
  }
);





Router.route(
  "/products/:_id/edit_product",
  function () {
    this.subscribe("publishProductId", this.params._id);
    this.subscribe("productImageById", this.params._id);
    if (this.ready()) {
      this.render("EditProductPage");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "productEdit",
  }
);

