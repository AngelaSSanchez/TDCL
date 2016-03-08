var miapp = angular.module("miapp", []);

miapp.controller ("reservaController",function($scope, $http){
	$scope.reservar = function(){
	    var url ="http://salonso.etsisi.upm.es/miw_serv/padel/disponibilidad.php";
	    var time = $scope.datepicker;
		var d = new Date(time);
		var birth = d.getTime();
	    $http.get(url, {params: {"day": birth}})
		    .success(function(datos, status, headers, config){
		        var respuesta = angular.fromJson(datos);
		      /*   if (respuesta.errorMessage == "nombre de usuario existente"){
		        	
		        }*/
		        console.log(respuesta.errorMessage);
		    });
	 }
});