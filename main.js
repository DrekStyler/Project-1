$(document).ready(function() {
    console.log('Am I sane?');
    var json2 = {};
    var text = [];
    var sepArr = []
    var speed = 200;
    var qCounter = 0;

    $('#speed').change(function() {
        speed = $('#speed').val(), alert('You think you can read that fast? ' + speed + ' ms delay')
    })

$('.materialSelect').change(function() {
  console.log($('.materialSelect').val());
  });

console.log($('.materialSelect').val());

if ($('.materialSelect').val() === "short") {
  console.log('sup');
  $.ajax({
          url: 'https://galvanize-cors-proxy.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/dmsproj1galvanize.appspot.com/o/short.json?alt=media&token=592dd566-db77-4db7-961b-ad9121a422ef',
          method: 'GET'
      })
      .done(function(data) {
          var short = data;
          var shortArr = $.map(short, function(value, index) {
    return [value];
});
          console.log('yay');
          let wordArr = shortArr[0].split(" ")
          console.log(wordArr);

        var shortArr = shortArr[0].split(" ");
        console.log('shortArr',shortArr);
        console.log('0',shortArr[0]);
        sepArr = shortArr


      })
      .fail(function(err) {
          console.log(err);
      });


} else {
  console.log('elon');
    $.ajax({
            url: 'https://galvanize-cors-proxy.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/dmsproj1galvanize.appspot.com/o/rawText.json?alt=media&token=e71f983c-555d-46f9-bbf8-06b49b61af4a',
            method: 'GET'
        })
        .done(function(data) {
            var json2 = data;
            console.log('nay');
            global(json2);
            return json2;
        })
        .fail(function(err) {
            console.log(err);
        });

}
    function global(data) {
        text.push(data)
        chapters = text[0].Table;
        separate(chapters)
        return chapters;
    }

    function separate(string) {
        for (let items in string) {
            for (let text in string[items]) {
                var snippet = string[items];
            }
            sepArr.push(snippet.split(" "))
        }
        return sepArr;
    }

    $('#play').on('click', (function() {
        read(sepArr)
    }));

    function read(input) {
        var newArr = input.join().split(",");
        print(newArr)

    }

    //how to access the element value
    function print(newArr) {
        newArr.forEach(timeout);
        return newArr
    }

    function timeout(el, index,array) {
        setTimeout(function() {
            $('#word').html("<div>" + el + "</div>");
            console.log(index);
            if (index === array.length - 1) {
                ask(question4)
                console.log('inside if');
            }
        }, (index + 1) * speed);

    }



    $('#lightsOut').on('click', function() {
        if ($('body').hasClass('background')) {
            $('body').removeClass('background')
            $('body').removeAttr('background')
            $('body').addClass('lightsOut')
        } else {
            $('body').addClass('background')
            $('body').removeClass('lightsOut')
            $('body').attr('background:"paper.jpeg"')
        }

    })

    $('#feedback').on('click', function() {
        alert("Hey nice thought!")
    })

    function Question(questionText, answerCorrect, answerIncorrect, qtype) {
        this.questionText = questionText;
        this.answerCorrect = answerCorrect;
        this.answerIncorrect = answerIncorrect;
        this.qtype = qtype;
    }

    var question1 = new Question(
        "Who is the CEO of SpaceX?",
        "Elon Musk", ["Henry Gerald", "Richard Branson", "Peter Tiel"],
        'MC'
    )

    var question2 = new Question(
        "How many satelites does SpaceX plan to launch?",
        4000, [500, 2000, 3500],
        'MC'
    )

    var question3 = new Question(
        "What other companies have expressed interest then abandoned this idea?",
        "Microsoft,Google", ["Yahoo", "Amazon"],
        'MS'
    )

    var question4 = new Question(
      "Paul Ryan works in which side of Congress?",
      "The House of Representatives",
      ["The Senate",
      "The House of Lords",
      "The House of Commons"]
    )

    var question5 = new Question(
      "The ________ is 'a massive piece of legislation that deals with much of the federal government’s funding.'",
      "omnibus Bill",
      ["CISA Bill",
      "House Defense Bill",
      "Onus Maximus Bill"]
    )







    function appendQuestion(questioninput) {
        $('.questions').append('<div class="qcontent">' + questioninput + '</div>')
    }


    function ask(question) {
      console.log('ask');
        $('.questions').empty()
        $('.questions').css({'visibility': 'visible'})
        appendQuestion(question.questionText)
        appendQuestion(question.answerCorrect)
        appendQuestion(question.answerIncorrect[0])
        appendQuestion(question.answerIncorrect[1])
        appendQuestion(question.answerIncorrect[2])
        addcheck()
        addAnswerButton()
        $('input:first').remove()

    }

    function addAnswerButton() {
        $('.questions').append('<button class="button answerButton">Amirite?</button>')

        $('.answerButton').on('click', (function() {
            verify()
        }));
    }

    function addcheck() {
        $('.qcontent').append('<input type="checkbox">')
        function checkcheck() {
            $('input').change(function() {
                console.log("shit has changed")
            })
        }
    }

    // function checkcheck() {
    //     $('input').change(function() {
    //         alert("shit has changed")
    //         console.log("hi");
    //     })
    // }
    // checkcheck()

    function verify () {
      ( $('input:first').is(':checked')? questionRight() : questionWrong());
    }

    function questionRight() {
      console.log('success');
      $('.questions').html("<div class='alert alert-success' role='alert'>Good Job! That was pretty easy though, heres another.</div>")
      qCounter++
      console.log(qCounter);

      if(qCounter >= 2) {
        location.reload()
      }

      var intervalID = setTimeout(function() { ask(question5); }, 2000);

    }

    function questionWrong() {

      $('.questions').html('<div class="alert alert-danger" role="alert">Cmon that wasn&#39t even fast.</div>')
      speed = 300;
      setTimeout(function() { $('.questions').css('visibility','hidden')}, 2000);
      setTimeout(function() { read(sepArr); }, 2000);
    }

    //come back and randomize answers





    //end of on ready
}());
