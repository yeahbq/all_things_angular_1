(function() {
'use strict';

  //all code will go in here...
  angular.module('myApp', [])
    .controller('MainController', function(){
      var vm = this;
      //example to show how data flows from controller to view
      vm.greeting = 'Metro Goldline\'s MVPS'
      //shows from view to controller
      vm.crazyColor = "gold";
      //ng directive using ng-repeat
      vm.names = ['Nicole', 'Layne', 'Winford', 'Mattie', 'Lawanda'];
      //pushes extra names into names when button pressed
      vm.extraNames = ['Diane', 'Santos', 'Liz', 'Gwyn'];
      vm.showNames = true;
      vm.addName = function() {
        if (vm.extraNames.length) vm.names.push(vm.extraNames.shift());
      };
      vm.gem = {
        name: 'Diamond',
        price: 'A MILLI',
        description: "BLANG BLANG"
      }
      vm.canPurchase = true;
      vm.soldOut = false;
      vm.bang = function() {
        vm.canPurchase = !vm.canPurchase;
        vm.soldOut = ! vm.soldOut;
      }
    })
})();
