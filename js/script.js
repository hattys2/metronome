const MAX_BOX_COUNT = 5;
let timeArr = [];

class Metronome {
  constructor(sounds, index) {
    this.index = index;
    this.note = sounds[`sound${index}`]
    this.tempo = $(`#box-${index}`).val()
  }

  run () {
    const n = this.note;
    timeArr.push(setInterval(function(){
      //n.play();
      console.log(n);
    }, 60 / this.tempo * 1000))
  }
}

const getImputBox = (index) => {
  return `<input id="box-${index}" class="input-box" type="text">`;
}


const init = () => {

  let sounds = {};
  _.each(_.range(MAX_BOX_COUNT), function(index) {
    sounds[`sound${index + 1}`] = new Audio(`./sound/sound${index + 1}.mp3`);
  })


  $('#main').append(getImputBox(1));

  $(document).on("click", "#start", function() {
    try {
      _.each($(".input-box"), function($box) {
        const val = Number($box.value);
        if (!Number.isInteger(val) || val === 0 || val >= 500) {
          throw new Error('value must be a nubmer between 1 ~ 500')
        }
      });
      _.each($(".input-box"), function($box, index) {
        const metronome = new Metronome(sounds, index + 1);
        metronome.run();
      });
      $("#start").hide();
      $("#stop").show();
    } catch (error) {
      alert(error);
    }
  })

  $(document).on("click", "#stop", function() {
    while (timeArr.length > 0) {
      clearInterval(timeArr.shift());
    }
    $("#start").show();
    $("#stop").hide();
  })

  $(document).on("click", "#add", function() {
    $("#delete").show();
    const number = $(".input-box").length;
    $('#main').append(getImputBox(number + 1));
    if (number === (MAX_BOX_COUNT - 1)) {
      $("#add").hide();
    }
  })

  $(document).on("click", "#delete", function() {
    $("#add").show();
    const number = $(".input-box").length;
    $(`#box-${number}`).remove();
  })

}

init();
