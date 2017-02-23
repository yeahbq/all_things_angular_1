//most of code will go here
(function() {
  "use strict";

  angular
    .module('ThePresidentsApp')
    .controller('PresidentsController', PresidentsController);

  PresidentsController.$inject = ['$http'];

  function PresidentsController($http){
    var vm = this;
    // vm.all = [
    //   {"name": "Blorp Florp McRichards", "start": 1789, "end": 1790 },
    //   {"name": "John MuscleBrain Adams", "start": 1790, "end": 1801 },
    //   {"name": "Blogpost Dorgabn", "start": 1801, "end": 1949 },
    //   {"name": "Mike", "start": 1949, "end": 1947 }
    // ];
    vm.all = [];
    vm.addPresident = addPresident;
    vm.newPresident = {};
    vm.truth = true;
    vm.removePresident = removePresident;
    vm.uncover = uncover;

    function addClass(president) {
      if (president.uncovered === true) {
        debugger;
      }
    }

    function uncover(president) {
      let url = '/api/presidents/' + president._id;
      president.uncovered = !president.uncovered;
      // addClass(president)
      $http
        .put(url, president)
        .then(function(response) {
          getPresidents();
        }, function(err) {
            console.log(err)
        })
    }

    function removePresident(president){
      let url = '/api/presidents/' + president._id;
        $http
          .delete(url)
          .then(function(response){
            getPresidents();
        }, function(err) {
              console.log(err);
        });
      }

    function getPresidents(){
        $http
          .get('/api/presidents')
          .then(function(response){
            vm.all = response.data.presidents;
        }, function(err) {
              console.log(err);
        });
      }

  getPresidents();

    function addPresident(){
        $http
        .post('/api/presidents', vm.newPresident)
        .then(function(res) {
          vm.all.push(res.data.president);
          vm.newPresident = {};
        }, function(err) {
          console.log(err);
        });
      }
  }
})();
