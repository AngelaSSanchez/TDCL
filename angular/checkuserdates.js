var miapp = angular.module("miapp", []);

miapp.controller ("userController",function($scope, $http){
	$scope.userExists = function(){
	    var urlUser ="http://salonso.etsisi.upm.es/miw_serv/padel/username.php";
	    jQuery('#error2').html(" ");
		jQuery('#alertuser2').removeClass("alert alert-warning");
		//jQuery("#submit-user").prop('disabled', false);
	    $http.get(urlUser, {params: {"username": $scope.user}})
		    .success(function(datos, status, headers, config){
		        var respuesta = angular.fromJson(datos);
		         if (respuesta.errorMessage == "nombre de usuario existente"){
		        	jQuery('#error2').html("<strong>Atencion!</strong> El nombre de Usuario ya existe!");
		        	jQuery('#alertuser2').addClass("alert alert-warning");
		        	return true;
		        }
		        return false;
		        console.log(respuesta.errorMessage);
		    });
	 }

	 $scope.emailExists = function(){
	    var urlEmail ="http://salonso.etsisi.upm.es/miw_serv/padel/email.php";
	    jQuery('#error2').html(" ");
		jQuery('#alertuser2').removeClass("alert alert-warning");
		
	    $http.get(urlEmail, {params: {"email": $scope.email}})
		    .success(function(datos, status, headers, config){
		        var respuesta = angular.fromJson(datos);
		        if (respuesta.errorMessage == "correo existente"){
		        	jQuery('#error2').html("<strong>Atencion!</strong> La dirección de correo ya existe!");
		        	jQuery('#alertuser2').addClass("alert alert-warning");
		        	return true;
		        }
		        return false;
		        console.log(respuesta.errorMessage);
		    });
	 }

	 $scope.checkPassword= function(){
        if ($scope.password != $scope.repeatPass){
        	jQuery('#error2').html("<strong>Atencion!</strong> Las contraseñas no coinciden!");
        	jQuery('#alertuser2').addClass("alert alert-warning");
        	return true;
        }
        return false;
	 }

});

miapp.controller ("reservaController",function($scope, $http){
	$scope.reservar = function(){
	    var url ="http://salonso.etsisi.upm.es/miw_serv/padel/disponibilidad.php";
	    var time = $( "#datepicker" ).datepicker( "getDate" );
		var d = new Date(time);
		var birth = d.getTime();
	    $http.get(url, {params: {"day": birth}})
		    .success(function(datos, status, headers, config){
		        var respuesta = angular.fromJson(datos);
				$scope.free = respuesta;
				 jQuery('#pistas').html("<h3 class='service-title-header'>Pistas disponibles</h3>");
		    });
	 }
});
