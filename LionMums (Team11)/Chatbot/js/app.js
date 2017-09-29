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
//<a href="localhost">shoo, get lost</a>
var msgArr = ['Hello, what would you like to update?',
				'<ul><li><a>Dates for services</a></li><li><a>Address</a></li><li><a>Phone Number</a></li></ul>',
				'<p>Currently you have the following dates:</p><ul><li><a>12th Nov 2017 8:30AM to 6:00PM</a></li><li><a>13th Nov 2017 8:30AM to 6:00PM</a></li><li><a>16th Nov 2017 8:30AM to 6:00PM</a></li><li><a>Add new dates</a></li></ul>',
				'What dates do you want?',
				'<p>Here are the list of available mothers.....</p><ul><li><a>Mother 1</a></li><li><a>Mother 2</a></li><li><a>Mother 3</a></li></ul>',
				'We will notify you once it is confirmed.'];

$(document).ready(function() {
	chat_init();
	listeners_init();
});

function listeners_init() {
	$('#sendMsgForm').submit(function(event){
		event.preventDefault();
		if ($('#msgInput').val() != '') {
			createMsg();
		}
	});

	$('#responseBtn0').click(function(){
		replyBot(msgArr[0]);
	});
	$('#responseBtn1').click(function(){
		replyBot(msgArr[1]);
	});
	$('#responseBtn2').click(function(){
		replyBot(msgArr[2]);
	});
	$('#responseBtn3').click(function(){
		replyBot(msgArr[3]);
	});
	$('#responseBtn4').click(function(){
		replyBot(msgArr[4]);
	});
	$('#responseBtn5').click(function(){
		replyBot(msgArr[5]);
	});
}

function chat_init(){
	database.ref().on('value', function(snap) {
		var results = snap.val();
		var messages = results.messages;

		var htmlStr = '';			
		for (var key in messages) {
			var message = messages[key];
			if (message.source == 'bot') {
				htmlStr += '<div class="row response ' + message.source + 'Response"><div class="col-xs-8">' + message.text + '</div></div>';
			} else {
				htmlStr += '<div class="row response ' + message.source + 'Response"><div class="col-xs-offset-4 col-xs-8">' + message.text + '</div></div>';
			}
		}

		$('#msgContainer').html(htmlStr);
		document.getElementById('msgContainer').scrollTo(0,document.getElementById('msgContainer').scrollHeight);
	});
}

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

function createMsg(){
	var inputMsg = $('#msgInput').val();

	var postData = {
		source: 'user',
		text: inputMsg,
	};

	var updates = {};
	var newPostKey = database.ref().child('messages').push().key;
	updates['/messages/' + newPostKey] = postData;
	database.ref().update(updates, function(error) {
		if (error) console.error(error.message);
		else {
			clearForm('#sendMsgForm')
		}
	});
}

function replyBot(inputMsg){
	var postData = {
		source: 'bot',
		text: inputMsg,
	};

	var updates = {};
	var newPostKey = database.ref().child('messages').push().key;
	updates['/messages/' + newPostKey] = postData;
	database.ref().update(updates, function(error) {
		if (error) console.error(error.message);
	});
}


