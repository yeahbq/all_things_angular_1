angular.module("MyApp")
    .controller("InfoController", InfoController)

function InfoController () {

  var vm = this;
  vm.hours = {
    Monday: "10:00 am - 5:30 pm",
    Tuesday: "10:00 am - 5:30 pm",
    Wednesday: "10:00 am - 5:30 pm",
    Thursday: "10:00 am - 5:30 pm",
    Friday: "10:00 am - 9:00 pm",
    Saturday: "10:00 am - 9:00 pm",
    Sunday: "10:00 am - 9:00 pm"
  }

  vm.admission = {
    Adults: "$25",
    Seniors: "$17",
    Students: "$12"
  }
}
