// Function to add new course
function addCourse(containerId, gradePointClass, creditsClass) {
    const courseContainer = document.getElementById(containerId);
    const courseElement = document.createElement('div');
    courseElement.classList.add('course');
  
    courseElement.innerHTML = `
      <label for="grade-point">Grade Points:</label>
      <input type="number" class="${gradePointClass}" placeholder="Enter grade points">
      
      <label for="credits">Credits:</label>
      <input type="number" class="${creditsClass}" placeholder="Enter credits">
      
      <button class="delete-course">Delete</button>
    `;
  
    // Add delete functionality
    courseElement.querySelector('.delete-course').addEventListener('click', () => {
      courseElement.remove();
      updateCalculation();
    });
  
    courseContainer.appendChild(courseElement);
  }
  
  // Function to calculate SGPA
  function calculateSGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = document.querySelectorAll('.grade-point');
    const credits = document.querySelectorAll('.credits');
  
    gradePoints.forEach((gp, index) => {
      const grade = parseFloat(gp.value);
      const credit = parseFloat(credits[index].value);
      if (!isNaN(grade) && !isNaN(credit)) {
        totalPoints += grade * credit;
        totalCredits += credit;
      }
    });
  
    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00;
    document.getElementById('sgpa-result').innerText = sgpa;
  }
  
  // Function to calculate CGPA
  function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = document.querySelectorAll('.cgpa-grade-point');
    const credits = document.querySelectorAll('.cgpa-credits');
  
    gradePoints.forEach((gp, index) => {
      const grade = parseFloat(gp.value);
      const credit = parseFloat(credits[index].value);
      if (!isNaN(grade) && !isNaN(credit)) {
        totalPoints += grade * credit;
        totalCredits += credit;
      }
    });
  
    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00;
    document.getElementById('cgpa-result').innerText = cgpa;
  
    // Convert CGPA to percentage (Formula: (CGPA - 0.75) * 10)
    const percentage = (cgpa - 0.75) * 10;
    document.getElementById('cgpa-percentage').innerText = percentage.toFixed(2);
  }
  
  // Function to update calculation based on selected calculator
  function updateCalculation() {
    const calculatorType = document.getElementById('calculator').value;
    if (calculatorType === 'SGPA') {
      calculateSGPA();
    } else {
      calculateCGPA();
    }
  }
  
  // Event Listeners for Add Course and Calculate Buttons
  document.getElementById('add-course').addEventListener('click', () => addCourse('courses', 'grade-point', 'credits'));
  document.getElementById('add-cgpa-course').addEventListener('click', () => addCourse('cgpa-courses', 'cgpa-grade-point', 'cgpa-credits'));
  
  document.getElementById('calculate-sgpa').addEventListener('click', calculateSGPA);
  document.getElementById('calculate-cgpa').addEventListener('click', calculateCGPA);
  
  // Switch between SGPA and CGPA calculators
  document.getElementById('calculator').addEventListener('change', (event) => {
    if (event.target.value === 'SGPA') {
      document.getElementById('sgpa-calculator').style.display = 'block';
      document.getElementById('cgpa-calculator').style.display = 'none';
    } else {
      document.getElementById('sgpa-calculator').style.display = 'none';
      document.getElementById('cgpa-calculator').style.display = 'block';
    }
  });
  
  // Initialize SGPA by default
  updateCalculation();
  
