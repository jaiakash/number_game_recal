var socket = io.connect("http://" + document.domain + ":" + location.port);

var starting_number = 1;
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
function display_numbers() {
  display[0] = starting_number;
  display[1] = getRandomInt(1, 10);
  display[2] = getRandomInt(1, 10);

  sortRandomly(display);

  $("h4.d1").html(display[0]);
  $("h4.d2").html(display[1]);
  $("h4.d3").html(display[2]);

  $("h4.score").html("Score : " + (starting_number - 1));
}

socket.on("connect", function () {
  socket.emit("message event", {
    data: "User Connected",
  });

  display_numbers();

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
    if (starting_number == msg.input_number) {
      starting_number++;
      display_numbers();
      alert("Correct!");
    }
  }
});
