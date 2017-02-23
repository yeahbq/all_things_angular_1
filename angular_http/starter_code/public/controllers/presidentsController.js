(function() {
  "use strict";

  angular
    .module('ThePresidentsApp')
    .controller('PresidentsController', PresidentsController);

  PresidentsController.$inject = [];

  function PresidentsController(){
    var vm = this;
    vm.all = [
      {"name": "Blorp Florp McRichards", "start": 1789, "end": 1790 },
      {"name": "John MuscleBrain Adams", "start": 1790, "end": 1801 },
      {"name": "Blogpost Dorgabn", "start": 1801, "end": 1949 },
      {"name": "Mike", "start": 1949, "end": 1947 }
    ];
    vm.addPresident = addPresident;
    vm.newPresident = {};

    function addPresident(){
      vm.all.push(vm.newPresident);
      vm.newPresident = {};
    }
  }
})();
