(function() {
'use strict';

angular.module('myApp', [])
    .controller('MainController', function() {
      var vm = this;
      vm.greeting = 'AngularJS, the Superheroic MV* Framework';
      vm.crazyColor = 'orange';
      vm.names = ['Nicole', 'Layne', 'Winford', 'Mattie', 'Lawanda'];
      vm.extraNames = ['Diane', 'Santos', 'Liz', 'Gwyn'];
      vm.showNames = true;
      vm.addName = function() {
        if (vm.extraNames.length) vm.names.push(vm.extraNames.shift());
      };

      vm.gem = {

            name: "diamond",
            price: "$3000",
            description: "shine bright like a diamond",
            canPurchase: true,
            soldOut: false
      }

      //Create an array of objects called gemsOfImagination

      vm.gemsOfImagination = [
        {
          name: "Heptagonal",
          price: 2.95,
          description: "...magnifique",
          canPurchase: true
        },
        {
          name: "Dodecahedron",
          price: 5.95,
          description: "...preciosa",
          canPurchase: true
        }
      ]

    });
})();
