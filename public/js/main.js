$(document).ready(function(){
  $('.delete_player').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type : 'DELETE',
      url: '/players/'+id,
      success: function(response){
        alert('Deleted');
        window.location.assign('/');
      },
      error: function(err){
        console.log(err);

      }
    })
  });
});
