var socket = io.connect("http://" + document.domain + ":" + location.port);

var starting_number = 1;
var clicked_button = 0;
var display_index = [0, 1, 2];
var display = [0, 0, 0];

// Function to get random integer between two numbers
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  tmp = Math.floor(Math.random() * (max - min + 1)) + min;

  // Check that no 2 numbers are same
  if (tmp == starting_number || tmp == display[1]) {
    return getRandomInt(min, max);
  } else return tmp;
};

// Function to sort array randomly - Fisher–Yates shuffle algorithm
const sortRandomly = (array) => {
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(i * Math.random());
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
};

// Function to display 3 randomised numbers
function update_display() {
  display[0] = starting_number;
  display[1] = getRandomInt(1, 10);
  display[2] = getRandomInt(1, 10);

  sortRandomly(display);

  // Clear the div and app end the number of apple
  $("div.display").html("");
  for (let i = 1; i <= starting_number; i++) {
    $("div.display").append(
      ' <div class="column"> <img src="static/apple.png" style="width: 100px" /> </div>'
    );
  }

  $("input.d1").attr("src", "static/numbers/" + display[0] + ".png");
  $("input.d2").attr("src", "static/numbers/" + display[1] + ".png");
  $("input.d3").attr("src", "static/numbers/" + display[2] + ".png");

  $("h4.score").html("Score : " + (starting_number - 1));
}

socket.on("connect", function () {
  socket.emit("message event", {
    data: "User Connected",
  });

  update_display();

  $(".d1").click(function () {
    clicked_button = 0;
  });

  $(".d2").click(function () {
    clicked_button = 1;
  });

  $(".d3").click(function () {
    clicked_button = 2;
  });

  var form = $("form").on("submit", function (e) {
    e.preventDefault();
    var submit = e.originalEvent.submitter;
    console.log(submit);
    socket.emit("message event", {
      number: display[clicked_button],
    });
  });
});

socket.on("message response", function (msg) {
  console.log(msg);

  // Check if number clicked is same as number of apple
  if (typeof msg.number !== "undefined") {
    if (starting_number == msg.number) {
      starting_number++;

      // Check if the number is less than 10 or not
      if (starting_number < 11) alert("Correct!");
      else {
        alert("You Won!!!");
        location.reload();
      }

      update_display();
    } else {
      alert("Wrong! Try again!");
    }
  }
});
