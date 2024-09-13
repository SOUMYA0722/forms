import { useState } from 'react';

const ProblemForm = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    problem: '',
    areaOfProblem: '',
    stepsTaken: '',
    proofFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('schoolName', formData.schoolName);
    data.append('problem', formData.problem);
    data.append('areaOfProblem', formData.areaOfProblem);
    data.append('stepsTaken', formData.stepsTaken);
    data.append('proofFile', formData.proofFile);
    
    const response = await fetch('/api/submit-problem', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      alert('Form submitted successfully!');
    } else {
      alert('Error submitting form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>School Name:</label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Problem in the School:</label>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      <div>
        <label>Area of Problem:</label>
        <select
          name="areaOfProblem"
          value={formData.areaOfProblem}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an area</option>
          <option value="teacher-shortage">Teacher Shortage</option>
          <option value="furniture-shortage">Furniture Shortage</option>
          <option value="other-facility">Other Facility</option>
        </select>
      </div>

      <div>
        <label>Steps Taken to Address the Problem:</label>
        <textarea
          name="stepsTaken"
          value={formData.stepsTaken}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      <div>
        <label>Proof of Improvement (Image or PDF):</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProblemForm;

          