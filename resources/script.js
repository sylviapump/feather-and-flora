document.addEventListener('DOMContentLoaded', function () {
    // Function to close navbar when a link is clicked
    function closeNavbar() {
        const navToggler = document.querySelector('.navbar-toggler');
        if (navToggler) {
            const navCollapse = document.querySelector('.navbar-collapse');
            const icon = navToggler.querySelector('span');
            if (navCollapse && icon && navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                icon.classList.toggle('fa-times', false);
                icon.classList.toggle('navbar-toggler-icon', true);
            }
        }
    }

    // Toggle navbar icon between default and 'X' icon
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            const icon = navbarToggler.querySelector('span');
            if (icon) {
                icon.classList.toggle('navbar-toggler-icon');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const weddingDateInput = document.getElementById('weddingDate');
    if (weddingDateInput) {
        weddingDateInput.setAttribute('min', today); // Set the min attribute
    }

    // Function to toggle visibility and required attributes
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        if (!checkbox || !designSelect) return; // Early exit if elements don't exist

        function toggleElements() {
            if (checkbox.checked) {
                designSelect.style.display = 'block'; // Show select box
                designSelect.setAttribute('aria-required', 'true');
                designSelect.setAttribute('required', 'required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            } else {
                designSelect.style.display = 'none'; // Hide select box
                designSelect.removeAttribute('aria-required');
                designSelect.removeAttribute('required');
                designSelect.querySelector('option[value=""]').textContent = 'No'; // Change default text
            }
        }

        checkbox.addEventListener('change', toggleElements);
        // Initialize state
        toggleElements();
    }

    // Set up visibility and required state toggles for each section
    const toggles = [
        ['sampleSet', 'sampleSetDesign'],
        ['saveTheDate', 'saveTheDateDesign'],
        ['invitationsEnvelopes', 'invitationsDesign'],
        ['invitationsRsvpSet', 'invitationsRsvpSetDesign'],
        ['invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesign'],
        ['programs', 'programsDesign'],
        ['menus', 'menusDesign'],
        ['placeCards', 'placeCardsDesign'],
        ['favourTags', 'favourTagsDesign'],
        ['thankYouNoteCards', 'thankYouNoteCardsDesign'],
        ['envelopeSeals', 'envelopeSealsDesign'],
        ['senderAddressLabels', 'senderAddressLabelsDesign']
    ];

    toggles.forEach(([checkboxId, designSelectId]) => toggleDesignElements(checkboxId, designSelectId));

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Get all checkboxes in the form
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        // Get the error message element
        const errorMessage = document.getElementById('error-message');
        if (!anyChecked) {
            // Display an error message if no checkboxes are checked
            if (errorMessage) {
                errorMessage.style.display = 'block'; // Show error message
            }
            return; // Prevent form submission
        } else {
            // Hide the error message if at least one checkbox is checked
            if (errorMessage) {
                errorMessage.style.display = 'none'; // Hide error message
            }
        }

        // Define sections to exclude from email
        const excludeDesigns = [
            'sampleSetDesign',
            'saveTheDateDesign',
            'invitationsDesign',
            'invitationsRsvpSetDesign',
            'invitationsRsvpDetailsSetDesign',
            'programsDesign',
            'menusDesign',
            'placeCardsDesign',
            'favourTagsDesign',
            'thankYouNoteCardsDesign',
            'envelopeSealsDesign',
            'senderAddressLabelsDesign'
        ];

        // Create a FormData object from the form
        const form = event.target;
        const formData = new FormData(form);

        // Ensure all checkboxes are included in the FormData object with "Yes" for checked and "No" for unchecked
        checkboxes.forEach(checkbox => {
            const designSelect = form.querySelector(`select[name="${checkbox.id}Design"]`);

            if (checkbox.checked) {
                formData.set(checkbox.id, 'Yes');
                if (designSelect && !excludeDesigns.includes(designSelect.name)) {
                    formData.set(designSelect.name, designSelect.value); // Use set instead of append to overwrite value
                }
            } else {
                formData.set(checkbox.id, 'No');
            }
        });

        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            if (!excludeDesigns.includes(key)) {
                if (data[key]) {
                    data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
                } else {
                    data[key] = value;
                }
            }
        });

        // Optional: Log the data object to verify
        console.log('Form Data:', data);

        // Use fetch to submit the form data
        fetch(form.action, {
            method: 'POST',
            body: new URLSearchParams(data),
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

    // Attach submit event listener to the form
    const form = document.querySelector('form[name="order-form"]');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
