// Function to handle form submission
function handleSubmit(event) {
    if (!validateForm(event)) {
        event.preventDefault(); // Prevent form submission if validation fails
        return;
    }

    event.preventDefault(); // Prevent default form submission

    // Get the form element
    const form = event.target;

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Collect all the checkbox inputs in the form
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    // Ensure unchecked checkboxes are not included in FormData
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            formData.delete(checkbox.name); // Remove unchecked checkboxes from FormData
        }
    });

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
        // If the key already exists, push the new value to the array
        if (data[key]) {
            // Handle cases where data[key] is not an array
            data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
        } else {
            data[key] = value;
        }
    });

    // Optional: Log the data object to verify
    console.log('Form Data:', data);

    // Use fetch to submit the form data
    fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(data), // Convert the data object to URLSearchParams
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(result => {
        console.log('Success:', result);
        // Redirect or show a success message
        window.location.href = 'thank-you.html'; // Redirect to thank you page
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, show an error message
    });

    return false; // Prevent default form submission
}
