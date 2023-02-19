      // Define the quiz questions and answers
      var quizData = [
        {
          question: "Question 1?",
          answers: [
            { text: "Answer 1A", correct: false },
            { text: "Answer 1B", correct: false },
            { text: "Answer 1C", correct: true },
            { text: "Answer 1D", correct: false }
          ]
        },
        {
          question: "Question 2?",
          answers: [
            { text: "Answer 2A", correct: false },
            { text: "Answer 2B", correct: true },
            { text: "Answer 2C", correct: false },
            { text: "Answer 2D", correct: false }
          ]
        },
        {
          question: "Question 3?",
          answers: [
            { text: "Answer 3A", correct: false },
            { text: "Answer 3B", correct: false },
            { text: "Answer 3C", correct: false },
            { text: "Answer 3D", correct: true }
          ]
        }
      ];

      // Set up the quiz variables
      var currentQuestion = 0;
      var numCorrect = 0;
      var timerInterval;

      // Get the answer entities and add event listeners to check for correct answers
      var answerEntities = document.querySelectorAll('.answer');
      answerEntities.forEach(function(answerEntity) {
        answerEntity.addEventListener('click', function() {
          var correct = this.getAttribute('data-correct') === 'true';
          if (correct) {
            numCorrect++;
          }
          showNextQuestion();
        });
      });

      // Start the quiz and timer
      function startQuiz() {
        currentQuestion = 0;
        numCorrect = 0;
        showNextQuestion();
        timerInterval = setInterval(updateTimer, 1000);
      }

      // Show the next quiz question
      function showNextQuestion() {
        // Check if the quiz is finished
        if (currentQuestion >= quizData.length) {
          clearInterval(timerInterval);
          showResults();
          return;
        }

        // Get the current question data
        var questionData = quizData[currentQuestion];

        // Set the question text
        var questionText = document.querySelector('#question a-text');
        questionText.setAttribute('value', questionData.question);

        // Set the answer texts and correct flags
        var answers = questionData.answers;
        for (var i = 0; i < answerEntities.length; i++) {
          var answerEntity = answerEntities[i];
          var answer = answers[i];
          var answerText = answerEntity.querySelector('a-text');
          answerText.setAttribute('value', answer.text);
          answerEntity.setAttribute('data-correct', answer.correct);
        }

        // Increment the current question index
        currentQuestion++;
      }

      // Update the timer text and check for timeout
      function updateTimer() {
        var timeLeft = parseInt(document.querySelector('#timer a-text').getAttribute('value').split(' ')[1]);
        timeLeft--;
        document.querySelector('#timer a-text').setAttribute('value', 'Time: ' + timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showResults();
        }
      }

      // Show the final quiz results
      function showResults() {
        var resultText = 'You got ' + numCorrect + ' out of ' + quizData.length + ' correct!';
        var resultEntity = document.createElement('a-entity');
        resultEntity.setAttribute('gui-rounded', '');
        resultEntity.setAttribute('gui-item', 'label', resultText);
        resultEntity.setAttribute('gui-item','font-size': 1.5, width: 3, height: 1.5, color: 'black', 'background-color': 'white', position: {x: 0, y: 1.5, z: -4}}');
        document.querySelector('#quiz').appendChild(resultEntity);
        }