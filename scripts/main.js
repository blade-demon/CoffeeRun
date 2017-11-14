(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SLIDER_SELECTOR = '[name="strength"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var Validation = App.Validation;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', new DataStore());
    // var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;

    // 订单列表绑定点击事件
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    // form绑定submit事件
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        return myTruck.createOrder.call(myTruck, data).then(function(data){
            checkList.addRow.call(checkList, data);
        }, function() {
            alert('Server unreachable. Try again later.');
        });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));
    // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    // console.log(formHandler);

    // document.querySelector(SLIDER_SELECTOR).addEventListener('change', function(event) {
    //     console.log(event.target.value);
    // });
})(window);