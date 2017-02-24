(function() {
  angular
    .module('InfamousCriminals')
    .controller('CriminalsController', CriminalsController);

  CriminalsController.$inject = ['$http'];

  function CriminalsController($http){
    var vm = this;
    vm.all = [];
    vm.addCriminal    = addCriminal;
    vm.newCriminal    = {};
    vm.getCriminals   = getCriminals;
    vm.deleteCriminal = deleteCriminal;

    getCriminals();

    function getCriminals(){
      $http
        .get('http://localhost:3000/api/criminals')
        .then(function(response){
          vm.all = response.data.criminals;
      });
    }

    function addCriminal(){
      $http
        .post('http://localhost:3000/api/criminals', vm.newCriminal)
        .then(function(response){
          getCriminals();
      });
      vm.newCriminal = {};
    }

    function deleteCriminal(criminal){
      $http
        .delete("http://localhost:3000/api/criminals/" + criminal._id)
        .then(function(response){
          var index = vm.all.indexOf(criminal);
          vm.all.splice(index, 1);
        });
    }

  }
})()
