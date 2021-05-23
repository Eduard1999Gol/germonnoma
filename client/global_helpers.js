import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';



Template.registerHelper("getCategories", function () {
    var codes = [];
            for(var k in category){
                if(k){
                    codes.push({value: k, display: category[k]});
                }
            }
            return codes;
});

Template.registerHelper("selectedCategory", function (p_category, opt_value) {
    if (p_category==opt_value) {
        return "selected"
        
    } else {
        return ""
        
    }
});