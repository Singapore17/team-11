/*----------------------------
	Initialize Script
----------------------------*/
var config = {
	apiKey: 'AIzaSyD0m2p0pbi_ZcJifNIeG5SlaSozNxCbGWY',
	authDomain: 'jpmcfg.firebaseapp.com',	
	databaseURL: 'https://jpmcfg.firebaseio.com',
	storageBucket: 'jpmcfg.appspot.com'
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {
	listeners_init();
});

function listeners_init() {
	$('#registerForm').submit(function(event){
		event.preventDefault();
		//$('#inputPostal').val()
		createForm('1.2222', '-1.222', $('#inputType').val(), 1)
	});


}

// function chat_init(){
// 	database.ref().on('value', function(snap) {	
// 		var results = snap.val();
// 		var messages = results.messages;

// 		var htmlStr = '';			
// 		for (var key in messages) {
// 			var message = messages[key];
// 			if (message.source == 'bot') {
// 				htmlStr += '<div class="row response ' + message.source + 'Response"><div class="col-xs-8">' + message.text + '</div></div>';
// 			} else {
// 				htmlStr += '<div class="row response ' + message.source + 'Response"><div class="col-xs-offset-4 col-xs-8">' + message.text + '</div></div>';
// 			}
// 		}

// 		$('#msgContainer').html(htmlStr);
// 		document.getElementById('msgContainer').scrollTo(0,document.getElementById('msgContainer').scrollHeight);
// 	});
// }

/*----------------------------
	Helper Methods
----------------------------*/

function clearForm(form){
	$('input:text, textarea', form).val('');
	$('input:checkbox, input:radio', form).removeAttr('checked');
}

/*----------------------------
	C.R.U.D Methods
----------------------------*/

function createForm(lat, lng, type, index){
	var dateArr = [['2017-01-01T06:00:00+01:00', '2017-01-01T06:00:00+02:00'],
					['2017-01-01T06:00:00+03:00', '2017-01-01T06:00:00+04:00']];

	//console.log(dateArr[0][1])

	var updates = {};
	var newPostKey = database.ref().child('users').push().key;
	updates['/users/' + newPostKey + '/lat'] = lat
	updates['/users/' + newPostKey + '/lng'] = lng

	if (type == 'care') {
		updates['/users/' + newPostKey + '/care'] = true;
		updates['/users/' + newPostKey + '/transport'] = false;
	} else {
		updates['/users/' + newPostKey + '/care'] = false;
		updates['/users/' + newPostKey + '/transport'] = true;

	}

	for(var count = 0; count < dateArr.length; count++){
		console.log(dateArr[count]);
	}
	
	database.ref().update(updates, function(error) {
		if (error) console.log("Error");
	});

	var dateupdates = {};
	var newDateKey = database.ref().child('users/'+newPostKey+'/dates').push().key;
	dateupdates['/users/' + newPostKey + '/dates/' + newDateKey + '/start'] = dateArr[index][0];
	dateupdates['/users/' + newPostKey + '/dates/' + newDateKey + '/end'] = dateArr[index][1];

	database.ref().update(dateupdates, function(error) {
		if (error) console.log("Error");
	});
}



// {
//   "users" : {
//     "-Km4dYgAmwpoZf4Z9f-2" : {
//       "care": "true",
//       "dates" : {
//         "-Km4dYgAmwpoZf4Z9f-2" : {
//           "datestart" : "",
//           "dateend" : "",
//           "timestart" : "",
//           "timeend" : ""
//         },
//         "-Km4dYgAmwpoZf4Z9f-2" : {
//           "datestart" : "",
//           "dateend" : "",
//           "timestart" : "",
//           "timeend" : ""
//         }
//       }
//     }
//   }
// }






