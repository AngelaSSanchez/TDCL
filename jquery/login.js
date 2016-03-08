
$().ready(function(){
	$("#user-login").prop('disabled', true);
	$("#submit-day").prop('disabled', true);
	$('#error3').html("<strong>Atencion!</strong> Necesitas estar registrado para reservar!");
	$('#alertuser3').addClass("alert alert-info");
	
	$( "#draggable" ).draggable({ revert: "invalid" });    
    $( "#droppable" ).droppable({
          drop: function( event, ui ) {
            $("#draggable").html( "<p class='center'><i class='fa fa-smile-o fa-2x'></i></p>" );
            $("#droppable").html( "<p class='center'><i class='fa fa-unlock-alt fa-4x'></i></p>" );
            $("#user-login").prop('disabled', false);
           }
    });

	$("#user-login").click(function(){
		$('#error').html(" ");
		$('#alertuser').removeClass("alert alert-danger alert-info");

		var emptyUser = function(){
			if($("#enterUser").val().length < 1) {
			    return false;
			}
			return true;
		};

		var emptyEmail = function(){
			if($("#userEmail").val().length < 1) {
			    return false;
			}
			return true;
		};

		if ((!emptyUser())&&(!emptyEmail())){
			$('#error').html("<strong>Atención!</strong> Debe introducir usuario o email!");
			$('#alertuser').addClass("alert alert-danger");
		}
		else
		{	
			if(emptyUser()){
				var idUser = $("#enterUser").val();
			}
			else if(emptyEmail()){
				var idUser = $("#userEmail").val();
			}
			$.ajax({
				method: "GET",
				data: { id: idUser, password: $("#userPassword").val()},
				dataType: "JSON",
				url: "http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php",
			    success: function(data, textStatus, request){
			        console.log(request.getResponseHeader('token'));
			        if (data.errorMessage == "none") {
			        	$('#error').html("<strong>Bienvenido!</strong> Te has registrado con éxito!");
						$('#alertuser').addClass("alert alert-info");
			        	$('#menulogin').html("<span class='glyphicon glyphicon-log-out' aria-hidden='true'></span> Logout");		
			        	$("#enterUser").prop('disabled', true);	     
			        	$("#userEmail").prop('disabled', true);	
			        	$("#userPassword").prop('disabled', true);	
			        	$("#user-login").prop('disabled', true);	
			        	$("#submit-day").prop('disabled', false);
			        	$('#error3').html(" ");
						$('#alertuser3').removeClass("alert alert-info");
			        }
			        else{
						$('#error').html("<strong>Atención!</strong> El usuario introducido no existe!");
						$('#alertuser').addClass("alert alert-danger");
			        }                        
			    }
			}); 
		}
    });	
});