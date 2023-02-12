var socket = io.connect("http://" + document.domain + ":" + location.port);

socket.on("connect", function () {
  socket.emit("message event", {
    data: "User Connected",
  });
  var form = $("form").on("submit", function (e) {
    e.preventDefault();
    let input_number = $("input.input_number").val();
    socket.emit("message event", {
      input_number: input_number,
    });
    $("input.message").val("").focus();
  });
});

socket.on("message response", function (msg) {
  console.log(msg);
  if (typeof msg.input_number !== "undefined") {
    $("div.message_holder").append(
      '<div><b style="color: #000">' + msg.input_number
    );
  }
});
