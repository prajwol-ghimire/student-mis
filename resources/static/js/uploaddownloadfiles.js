
// const Handlebars = require('handlebars');

// function ifEquals(arg1, arg2, options) {
// 	return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
// }

// Handlebars.registerHelper('ifEquals', ifEquals);

// Handlebars.Utils.registerHelper('ifEquals', function(arg1, arg2, options) {
//     console.log("asjhgfkjahsgjk")
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// })

$(document).ready(function() {
	$(".uploadSingleFileForm").submit(function(evt) {
		evt.preventDefault();
		var parameter = $(this).data("param"); 
		createdurl = '/api/file/upload/' + parameter;
		console.log(createdurl);
		let formData = new FormData($(this)[0]);
		$.ajax({
			url : createdurl,
			type : 'POST',
			data : formData,
			async : false,
			cache : false,
			contentType : false,
			enctype : 'multipart/form-data',
			processData : false,
			success : function(response) {
				$("#response").empty();
				if(response.status !== "error"){
					let displayInfo = response.filename + " : " + response.message + "<br>"; 
					
					$("#response").append(displayInfo);
					// add some css
					$("#response").css("display", "block");
					$("#response").css("background-color", "#e6e6ff");
					$("#response").css("border", "solid 1px black");
					$("#response").css("border-radius", "3px");
					$("#response").css("margin", "10px");
					$("#response").css("padding", "10px");
				}else{
					$("#response").css("display", "none");
					let error = response.error;
					alert(error);
				}
			},
			error: function(e){
				alert("Fail! " + e);
			}
		});
		
		return false;
	});
	
})