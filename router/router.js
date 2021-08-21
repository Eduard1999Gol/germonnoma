function redirectHome() {
  if (Meteor.userId()) {
    this.redirect("/");
  } else {
    this.next();
  }
}

Router.configure({
  layoutTemplate: "Layout",
  template: "Layout",
});


Router.route(
  "/",
  function () {
    this.subscribe("products");
    this.subscribe("productImages");
    if (this.ready()) {
      this.render("Home");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "home",
    data: function () {
      var arr = [];
      var arr2 = [];
      var products = Products.find({ selected: false }).fetch();
      var selected_products = Products.find({ selected: true }).fetch();
      products.forEach((product) => {
        var image = ProductImages.findOne({ "meta.product_id": product._id });
        if (image) {
          product["image"] = image.link();
          arr.push(product);
        }
      });
      selected_products.forEach((product) => {
        var image = ProductImages.findOne({ "meta.product_id": product._id });
        if (image) {
          product["image"] = image.link();
          arr2.push(product);
        }
      });
      return {
        products: arr,
        selected_products: arr2,
      };
    },
  }
);

Router.route(
  "/products/:_id",
  function () {
    this.subscribe("publishProductId", this.params._id);
    console.log(this);
    this.subscribe("productImageById", this.params._id);
    if (this.ready()) {
      this.render("ProductDetails");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "productDetails",
    data: function () {
      var product = Products.findOne({ _id: this.params._id });
      var image = ProductImages.findOne({
        "meta.product_id": product._id,
      }).link();
      product["image"] = image;
      return {
        product: product,
      };
    },
  }
);

Router.route(
  "/addproduct",
  function () {
    this.subscribe("product");
    this.subscribe("productImages");
    if (!Meteor.userId()) {
      Router.go("home");
      
    } else 
    if (this.ready()) {
      this.render("AddProduct");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "addProduct",
  }
);

Router.route(
  "/register",
  function () {
    this.subscribe("users");
    if (this.ready()) {
      this.render("Register");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "register",
  }
);


Router.route(
  "/login",
  function () {
    this.subscribe("users");
    if (this.ready()) {
      this.render("Login");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "login",
  }
);

Router.route(
  "/forgot_password",
  function () {
    this.subscribe("users");
    if (this.ready()) {
      this.render("ForgotPassword");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "forgotPassword",
  }
);

Router.route(
  "/my_profile/:_id",
  function () {
    this.subscribe("users");
    if (!Meteor.userId()) {
      Router.go("home");
      
    } else 
    if (this.ready()) {
      this.render("MyProfile");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "MyProfile",
    data: function () {
      var user = Meteor.users.findOne({_id: this.params._id})
      return {
        user: user
      }
    },
  }
);




Router.route(
  "/products/:_id/edit_product",
  function () {
    this.subscribe("publishProductId", this.params._id);
    this.subscribe("productImageById", this.params._id);
    if (this.ready()) {
      this.render("ProductEditPage");
    } else {
      this.render("Loading");
    }
  },
  {
    name: "productEdit",
    data: function () {
      var product = Products.findOne({ _id: this.params._id });
      if (product) {
        var image = ProductImages.findOne({ "meta.product_id": product._id });
      }
      if (image) {
        product["image"] = image.link();
      }
      return {
        product: product,
      };
    },
  }
);
