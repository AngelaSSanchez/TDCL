
$().ready(function(){
	$( "#datepicker" ).datepicker({
		altField: "#day",
		altFormat: "dd/mm/yy"
	});
	$("#submit-user").click(function(){
		$('#error').html(" ");
		$('#alertuser').removeClass("alert alert-danger alert-info alert-warning");
	//var datos = { username: $("#username").val(), email: $("#email").val(), password: $("#password").val(), birthDate:$("#birthDate").val()};

			//.serialize()
			var time = $("#birthDate").val();
			var dsplit = time.split("-");
			var d = new Date(dsplit[0],dsplit[1]-1,dsplit[2]);
			var birth = d.getTime();
			console.log(birth); 
			
			$.ajax({
				method: "POST",
				data: { username: $("#username").val(), email: $("#email").val(), password: $("#password").val(),birthDate:birth},
				dataType: "JSON",
				url: "http://salonso.etsisi.upm.es/miw_serv/padel/usuario.php",
			    success: function(data, textStatus, request){
			    	console.log(data.errorMessage);  
			    	if (data.errorMessage != "Usuario o email ya existente"){
			    		$('#error2').html("<strong>Bienvenido!</strong> Te has registrado con éxito!");
						$('#alertuser2').addClass("alert alert-info");
						$("#submit-day").prop('disabled', false);
						$('#error3').html(" ");
						$('#alertuser3').removeClass("alert alert-info");
			    	}

			    }
			}); 
		
    });	
});