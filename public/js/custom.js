/**
 * Commong JS functions used in the app
 * 
 */

var app = new Object();

app.init = function(){
	$('#xlUpload1').submit(app.post);
	$('#xlUpload2').submit(app.post);
	$('#xlUpload3').submit(app.post);
};

app.post = function(e){

	e.preventDefault();	
	
	var f = $(this).parent().find("input[type='file']").val().split('/').pop().split('\\').pop();
	
	console.log( $("#"+f).length > 0 );
	
	if (!app.checkDup(f)){
		$.ajax({
	    	type: $(this).attr('method'),	
	    	url: $(this).attr('action'),
	    	data: new FormData(this),
	    	processData: false,
			error: function(xhr) {
		            status('Error: ' + xhr.status);
	        },
			contentType: false,
			dataType: 'json',
	        success: app.render
	    }); 
	    
	    app.updateUploadSec($(this).parent());
	}
	else {
		alert("File uploaded previously! Please upload another file or rename the new file.");
	}

    
};


app.checkDup = function(l){
   
	console.log("Checking for duplicate ==>"+l );
	
	if ( $("#"+l).length) {
		return false;
	}
	else{
		console.log("Found ..."+$(".container-left").find("div").attr("id"));
		return false;
	}
		
}

app.render = function(xl){
	// console.log(JSON.stringify(xl.filename));
	
	app.hideUpload(xl.filename);
	
	var sheets =$("<div/>", {
		'class':'sheets',
	     id: xl.filename
	}).appendTo('.container-left');
	
	$.each(xl.sheets, function(c, v){
//		console.log( c + " : " + v +" @ "+ $(this)[0] );
		
		var s = c; // Sheet name
		
		var sheet = $("<div/>", {
			'class': 'sheet'
		}).appendTo(sheets);
		
		$("<input/>",{
			type: 'radio',
			id: s,
			name: 'sheet-group',
			checked: function(){
					if ($(this)[0])
						return true;
					else
						return false;
							
			}
		}).appendTo(sheet);
		
		$("<label/>", {
			'for': s,
			text: s
		}).appendTo(sheet);
		
		var table = $("<table/>", {
			'class': 'data'
		}).appendTo(sheet);
		
		var defaultRowCount = 20;
		var defaultColRange = 27;
		
		if (v['!ref'] != undefined){
			var range = v['!ref'].split(':')[1].match(/(\d+|[^\d]+)/g).join('|').split('|');
			defaultRowCount = range[1] > defaultRowCount ? range[1] : defaultRowCount;
			  
			if(range[0].length == 2 ){
				defaultColRange += ( (range[0].charCodeAt(0) - 64 ) * 26) + (range[0].charCodeAt(1) - 64 );  
			}
		}
	
//		console.log(range+":: "+range[0].charCodeAt(0)+" & "+range[0].length+" :: defaultColRange ="+ defaultColRange);
	
		for (var r = 0; r <= defaultRowCount; r++){
		
			var tr = $("<tr/>",{
				id: "r"+r
			}).appendTo(table);
		
			if ( r == 0){
				for (var c = 0; c < defaultColRange; c++){
					$("<th/>",{
						id: '_'+r,
						html: ( function(){
							if(c <= 26)
								return ( c != 0 ) ? String.fromCharCode(c+64) : ''
							else {
									var n = Math.floor(c/26);
									var e = c % 26;
									
									if(e == 0){
										e = 26;
										n--;
									}
		//							console.log('c='+c+' :: n ='+n+' & e ='+e+' :: ==>'+String.fromCharCode(n+64)+String.fromCharCode(e+64));
									
									return String.fromCharCode(n+64)+String.fromCharCode(e+64);
								}
							})									
					}).appendTo(tr);
				}	 
			}
			else {
				for (var c =  0; c < defaultColRange; c++){
					if(c == 0 )
						$("<th/>",{
							id: '_'+r,
							html: r
						}).appendTo(tr);
					else
						$("<td/>",{
							id: function(){
								if(c <= 26)
									return ( c != 0 ) ? String.fromCharCode(c+64)+r : ''
								else {
										var n = Math.floor(c/26);
										var e = c % 26;
										
										if(e == 0){
											e = 26;
											n--;
										}
			//							console.log('c='+c+' :: n ='+n+' & e ='+e+' :: ==>'+String.fromCharCode(n+64)+String.fromCharCode(e+64));
										
										return String.fromCharCode(n+64)+String.fromCharCode(e+64)+r;
									}
							}
						}).appendTo(tr);
				}
			}
		}
	
		//Iterating through JSON map
		$.each(v, function(l, t){
		// console.log( l + " - "+t )
			if ( l !== "!ref")
				$("#"+l).html(t)
		}); 
	});
	
}

app.updateUploadSec = function(ele){

	var f = $(ele).find("input[type='file']").val().split('/').pop().split('\\').pop();
	
	$div = $("<div/>",{
			html: f
			});
			
	$(ele).html($div);
	
	$(ele).click(function(){
		app.hideUpload(f);
	});
	
}

app.hideUpload = function(n){
	
	$(".sheets").each(function(d, h){
		
		if( $(this).attr("id") === n)
			$(this).show();
		else
			$(this).hide();
	});
}





