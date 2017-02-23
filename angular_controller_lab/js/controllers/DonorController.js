angular.module("MyApp")
    .controller("DonorController", DonorController)

function DonorController () {

  let vm = this;
  vm.contact = "development@metromuseum.org"
  vm.phone = "212-650-2425"
  vm.amount = [50, 100, 250, 500, 1000, 5000]
}
