$(function(){

console.log('document loaded');

  getSongs();

$('#addSong').on("submit",addSong);


});

function getSongs(){
  $.ajax({
    url:'/songs',
    type:'GET',
    success:displaySongs
  });
}

function displaySongs(songs){

  console.log(songs);
  $('#songs').empty();
  var d=new Date();
  songs.forEach(function(song){
    $('#songs').append('<li>'+song.title+' by '+song.artist+' from album '+song.album+' added on '+d+'</li>');
  });
}

function addSong(event){
  event.preventDefault();
  var songData=$(this).serialize();
  console.log(songData);

  $.ajax({
    url:'/songs',
    type:'POST',
    data:songData,
    success:getSongs
  });




}
