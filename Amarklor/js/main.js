      if (typeof jQuery != 'undefined') {

        //alert("jQuery library is loaded!");
        //console.warn("COBI", "jQuery library is loaded!");

          }else{

        //alert("jQuery library is not found!");
        //console.warn("COBI", "jQuery library is not loaded!");

        }

$(document).ready(function() {

   // $(".box").click(function(){
   //     alert('hi');

   // });

        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();

    COBI.init('token — can by anything right now');

    COBI.app.touchInteractionEnabled.subscribe(function(enabled) {
  funky(); myDistance(); avgSpd();findme();ridingDur();power();cadence();calories();ascent();
    });

    COBI.app.clockVisible.write(false);

     COBI.app.theme.subscribe(
        function (value) {
            console.log(value)
        }
         )

    COBI.hub.externalInterfaceAction.subscribe(function(action) {
        console.log('I just tapped the handlebar remote and instantly received this ' + action + ' in my Web App');
        switch (action) {
            case "RIGHT":

                 //alert(action)
            case "LEFT":
                 //COBI.state.edit;
                 //alert(COBI.parameters.state())
            case "UP":
                 //alert(action)
            case "DOWN":

                  //alert(action)
            case "SELECT":
                  //funky(); myDistance(); avgSpd();findme();ridingDur();power();cadence();calories();ascent();
                  //alert(action);

        }
    })
            let position = null;
            let pos = null;
            let lat = null;
            let long = null;

        function funky() {
             COBI.rideService.speed.subscribe(function(speed){
               let spdKMH = speed * 3.6;
               let spdMPH = speed/.44704;
               console.log('Your current speed is ' + spdMPH + 'MPH');
               //document.getElementById("spd").innerHTML = spdMPH.toFixed(1);
               });
        }

        function findme() {
            COBI.mobile.location.subscribe(function (location){
                let date = new Date();
                let pos = location;
                let lat = location.coordinate.latitude.toPrecision();
                let lng = location.coordinate.longitude.toPrecision();
				
				speedLimit(lat,lng);
				
                let result = SunCalc.getTimes(date, lat, lng)
                let date_string = new Date(result.sunset);
                let sunset = moment(date_string).format(' h:mm a')
                document.getElementById("sunset").innerHTML =  sunset;
            });
        }

		function speedLimit(lat,lng){
			
			console.log( 'Your LAT is: :' + lat);
			console.log('Your LONG is: ' + lng);
			
			let mapUrl = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=[Your MapQuest Key Here]&location=';	
			mapUrl = mapUrl + lat + ',' + lng;
			mapUrl = mapUrl + '&includeRoadMetadata=true&includeNearestIntersection=true';
		
			console.log(mapUrl);
			
			    $.ajax({

					url: mapUrl,
					error: function() {
						$('#info').html('<p>An error has occurred</p>');
					},
					dataType: 'jsonp'

				}).then
				(function(data) {
        let str = data.results[0].locations[0].street;
		document.getElementById("display").innerHTML = str;
		
		console.log("The Street is: " + str);
		
		
		let flg = data.results[0].locations[0].roadMetadata;
		
		if(typeof flg === 'undefined' || flg === null ){
				let spdlmt = "n/a";
				console.log(spdlmt);
				//alert(spdlmt);
				setUP(spdlmt,str);
				
			}else{
				let spdlmt = data.results[0].locations[0].roadMetadata.speedLimit + " " + data.results[0].locations[0].roadMetadata.speedLimitUnits;
				//console.log(spdlmt);
				setUP(spdlmt,str);
			};	
 
		function setUP(spdlmt,str)
		{

			document.getElementById("spd").innerHTML = spdlmt;
			console.log("the SPEED LIMIT is :" + spdlmt);


			   

		};		
    });	
				
				
				
			
		}
		
        function myDistance() {
            COBI.tourService.ridingDistance.subscribe(function (distance){
                 let  dist = distance * 0.00062137;
                 //let  new_dist = $("#miles").val(num.toFixed(2));

                 console.log('Your distance traveled is ' + dist.toString());
                 document.getElementById("miles").innerHTML =  dist.toFixed(1);

          });
        }

         function avgSpd() {
            COBI.tourService.averageSpeed.subscribe(function (averagespeed){
                 let avgSpd = averagespeed/.44704;

                 console.log('Your average speed is ' + avgSpd.toString());
                 document.getElementById("avgspeed").innerHTML = avgSpd.toFixed(1);

          });
        }

    function ridingDur() {
            COBI.tourService.ridingDuration.subscribe(function (ridingDuration){
                let duration = ridingDuration/60;
                console.log('Your ride  duration is ' + duration.toString());
                document.getElementById("rideduration").innerHTML =  duration.toFixed(2);


          });
        }

        function power(){
            COBI.rideService.userPower.subscribe(function (userpower) {
            let power =  userpower;
            console.log('Your power is ' + power.toString());
            document.getElementById("power").innerHTML =  power.toPrecision(3);
         });
        };

        function cadence(){
            COBI.rideService.cadence.subscribe(function(cadence) {
            let cad = cadence;
            console.log('Your current cadence is ' + cadence + ' rpm.');
            document.getElementById("cadence").innerHTML = cadence.toPrecision();
          });
        };

        function calories(){
            COBI.tourService.calories.subscribe(function(calories) {
            let cal = calories;
            console.log('Your current calorie burn is ' + calories);
            document.getElementById("calories").innerHTML = calories.toPrecision(2);
          });
        };

function ascent(){
            COBI.tourService.ascent.subscribe(function(ascent) {
            let asc = ascent;
            console.log('Your current ascent is ' + ascent);
            //$("#cadence").val(cad);
             document.getElementById("ascent").innerHTML = ascent.toPrecision(3);
          });
        };


});
