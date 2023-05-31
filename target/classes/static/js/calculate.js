// Variable representing the grades of all students
var grades = [
    65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01
  ];

 var InputTable = document.getElementById("InputTable");


  function SubmitInput(){
    var lowerBoundInputs = document.querySelectorAll("#InputTable input[type='text']");
    var lowerBounds = Array.from(lowerBoundInputs).map(function(input) {
      var value = parseFloat(input.value);
      return isNaN(value) ? 0 : value;
    });
    for (var i = 0; i < lowerBounds.length; i++) 
    {
      InputTable.rows[i+1].cells[1].getElementsByTagName('input')[0].style.border = '';
    }

    for (var i = 0; i < lowerBounds.length-1; i++) 
    {
      var CurGradeCell = lowerBounds[i];
      var NextGradeCell = lowerBounds[i+1];
      console.log(CurGradeCell,NextGradeCell);
      if(CurGradeCell > 100 || CurGradeCell <= 0)
      {
        alert("Invalid grades distribution! Please enter valid numbers.");
        InputTable.rows[i+1].cells[1].getElementsByTagName('input')[0].style.border = '2px solid rgb(224,67,70)';
        return;
      }
      else if(CurGradeCell < NextGradeCell)
      {
        alert("Invalid grades distribution! Please enter valid numbers.");
        InputTable.rows[i+2].cells[1].getElementsByTagName('input')[0].style.border = '2px solid rgb(224,67,70)';

        return;
      }

      else if(lowerBounds[lowerBounds.length-1] < 0 || lowerBounds[lowerBounds.length-1] >100)
      {
        alert("Invalid grades distribution! Please enter valid numbers.");
        InputTable.rows[lowerBounds.length].cells[1].getElementsByTagName('input')[0].style.border = '2px solid rgb(224,67,70)';

        return;
      }
    }
      generateHistogram();
  }
  // Function to add a new grade to the array
  function addNewGrade() {
    var newGradeInput = document.getElementById("newGradeInput");
    var newGrade = parseFloat(newGradeInput.value);
    
    if (isNaN(newGrade) || newGrade > 100 || newGrade < 0) {
      alert("Invalid input! Please enter a valid number.");
      return;
    }

    grades.push(newGrade);
    newGradeInput.value = "";
    generateHistogram();
    
  }


function generateHistogram() {
    var gradeTable = document.getElementById("gradeTable");
  

    // Update the histogram representation in the HTML
    for (var i = 0; i < gradeTable.rows.length; i++) {
      var gradeCell = gradeTable.rows[i].cells[1];
      var gradeCount = countGradesInRange(i+1);
      var gradeSymbols = "O".repeat(gradeCount);
      gradeCell.innerText = gradeSymbols;
    }
  }

  // Function to count the number of grades in a specific range
  function countGradesInRange(rangeIndex) {
    var lowerBoundInputs = document.querySelectorAll("#InputTable input[type='text']");
    // Extract the lower bounds from the input elements
    var lowerBounds = Array.from(lowerBoundInputs).map(function(input) {
      var value = parseFloat(input.value);
      return isNaN(value) ? 0 : value;
    });
    var count = 0;
    for (var i = 0; i < grades.length; i++) {
      if (grades[i] >= lowerBounds[rangeIndex] && grades[i] < lowerBounds[rangeIndex-1] || (grades[i] >= lowerBounds[rangeIndex] && rangeIndex == 0)) {
        count++;
      }
      
    }
    
    return count;
  }

  // Call the generateHistogram() function initially to display the histogram
  generateHistogram();