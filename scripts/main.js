(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SLIDER_SELECTOR = '[name="strength"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;

    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    console.log(formHandler);

    // document.querySelector(SLIDER_SELECTOR).addEventListener('change', function(event) {
    //     console.log(event.target.value);
    // });
})(window);