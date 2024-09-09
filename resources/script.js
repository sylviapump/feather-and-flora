// Function to close navbar when link is clicked
function closeNavbar() {
    var navToggler = document.querySelector('.navbar-toggler');
    if (navToggler) {
        var navCollapse = document.querySelector('.navbar-collapse');
        var icon = navToggler.querySelector('span');
        if (navCollapse && icon) {
            if (navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('navbar-toggler-icon');
                }
            }
        }
    }
}

// Toggle navbar icon between default and 'X' icon
document.addEventListener('DOMContentLoaded', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            var icon = navbarToggler.querySelector('span');
            if (icon) {
                if (icon.classList.contains('navbar-toggler-icon')) {
                    icon.classList.remove('navbar-toggler-icon');
                    icon.classList.add('fa', 'fa-times');
                } else {
                    icon.classList.remove('fa', 'fa-times');
                    icon.classList.add('navbar-toggler-icon');
                }
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
                designSelect.querySelector('option[value=""]').textContent = 'None Selected'; // Change default text
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
        ['rsvpCardsEnvelopes', 'rsvpDesign'],
        ['detailsCard', 'detailsDesign'],
        ['invitationsRsvpSet', 'invitationsRsvpSetDesign'],
        ['invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesign'],
        ['programs', 'programsDesign'],
        ['menus', 'menusDesign'],
        ['placeCards', 'placeCardsDesign'],
        ['favourTags', 'favourTagsDesign'],
        ['thankYouNoteCards', 'thankYouNoteCardsDesign'],
        ['envelopeSeals', 'envelopeSealsDesign'],
        ['otherCheckbox', 'otherTextBox']
    ];

    toggles.forEach(([checkboxId, designSelectId]) => toggleDesignElements(checkboxId, designSelectId));

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

        // Ensure all checkboxes are included in the FormData object with "None Selected" for unchecked
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                formData.append(checkbox.name, 'None Selected'); // Add "None Selected" for unchecked
            }
        });

        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            if (data[key]) {
                data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
            } else {
                data[key] = value;
            }
        });

        // Filter out specific design fields that should not be included in the email
        const excludedFields = [
            'sampleSetDesign',
            'saveTheDateDesign',
            'invitationsDesign',
            'rsvpDesign',
            'detailsDesign',
            'invitationsRsvpSetDesign',
            'invitationsRsvpDetailsSetDesign',
            'programsDesign',
            'menusDesign',
            'placeCardsDesign',
            'favourTagsDesign',
            'thankYouNoteCardsDesign',
            'envelopeSealsDesign'
        ];

        excludedFields.forEach(field => {
            delete data[field];
        });

        // Optional: Log the data object to verify
        console.log('Filtered Form Data:', data);

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
