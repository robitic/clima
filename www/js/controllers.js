var climas;
var climaxH;
var ciudad="Cancun";
var unidades="metric";
var dias="5";

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $http) {
	
    $http.get("http://api.openweathermap.org/data/2.5/weather?q="+ciudad,{cache:true}).then(function(response){
    $scope.clima = {};
    $scope.clima = response.data;
  });
	
})

.controller('ChatsCtrl', function($scope, Chats, $http) {

  $scope.actaulizar=function(){
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt="+dias+"&q="+ciudad+"&units="+unidades+"&lang=es").then(function(data){
    this.climas = data.data.list;
    $scope.ciudadinfo=data.data.city;
   $scope.chats = this.climas;
  });

  $http.get("http://api.openweathermap.org/data/2.5/forecast?&cnt="+(dias*8)+"&q="+ciudad+"&units="+unidades).then(function(data){
   this.climaxH = data.data.list;
  });

  }
  
  $scope.actaulizar();
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log(climaxH.le);
	for (var i = 0; i < climas.length; i++) {
        if (climas[i].dt === parseInt($stateParams.chatId)) {
          $scope.chat = climas[i];
        }
      }

      var dia=new Date($scope.chat.dt*1000);
      dia=dia.getDate()+"."+dia.getMonth();
      var arraytemp=[];

      for (var i = 0; i < climaxH.length; i++) {
        var dia2=new Date(climaxH[i].dt*1000);
        dia2=dia2.getDate()+"."+dia2.getMonth();
        console.log(dia2);
        console.log(dia==dia2);
        if (dia==dia2) {
          arraytemp.push(climaxH[i]);
        }
      }
      $scope.chats=arraytemp;
})

.controller('AccountCtrl', function($scope) {

  $scope.changeValues=function(){
    ciudad=$scope.settings.ciudad;
    unidades=$scope.settings.unidad;
    dias=$scope.settings.dia;
  }

  $scope.settings = {
    enableFriends: true,
    dia:dias,
    unidad:unidades,
    ciudad:ciudad
  };

});
