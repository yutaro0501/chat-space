$(function () {

  function buildHTML(message) {

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; 

    var html = `<div class="message" data-message_id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }

$('#new_message').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('form')[0].reset();
    $('#send-button').prop('disabled', false);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  })
  .fail(function(){
    alert('error');
  })
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {:format=>"json"}'  
      var last_message_id = $(".message:last").data("message_id"); 
      $.ajax({    
        url: href, 
        type: "GET", 
        data: {message_id: last_message_id},
      })
      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $(".messages").append(insertHTML);
        })
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });