angular.module("MyApp")
    .controller("DonorController", DonorController)

function DonorController () {

  let vm = this;
  vm.contact = "development@metromuseum.org"
}
