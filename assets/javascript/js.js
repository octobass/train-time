var config = {
    apiKey: "AIzaSyD72cNEsQjRTR9unRqNr-_uSWTKqaeKu14",
    authDomain: "database2-e81ae.firebaseapp.com",
    databaseURL: "https://database2-e81ae.firebaseio.com",
    projectId: "database2-e81ae",
    storageBucket: "database2-e81ae.appspot.com",
    messagingSenderId: "683163680301"
  };

  firebase.initializeApp(config); 

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#start-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var firstTime = trainStart;
  var tFrequency = trainFrequency;

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 
  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = diffTime % tFrequency;

  var tMinutesTillTrain = tFrequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainArrival = moment(nextTrain).format("HH:mm");

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTime,
    frequency: trainFrequency,
    nextTrainArrival: nextTrainArrival,
    tMinutesTillTrain: tMinutesTillTrain
  };

  database.ref().push(newTrain);

  alert("Train added successfully");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;
  var nextTrainArrival = childSnapshot.val().nextTrainArrival;
  var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;

   $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
   trainFrequency + "</td><td>" + nextTrainArrival + "</td><td>" + tMinutesTillTrain );

});

