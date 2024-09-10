document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle visibility and required attributes
    function toggleDesignElements(checkboxId, designContainerId) {
        const checkbox = document.getElementById(checkboxId);
        const designContainer = document.getElementById(designContainerId);

        if (!checkbox || !designContainer) return; // Early exit if elements don't exist

        function toggleElements() {
            if (checkbox.checked) {
                designContainer.style.display = 'block'; // Show select box container
                designContainer.querySelector('select').setAttribute('aria-required', 'true');
                designContainer.querySelector('select').setAttribute('required', 'required');
            } else {
                designContainer.style.display = 'none'; // Hide select box container
                designContainer.querySelector('select').removeAttribute('aria-required');
                designContainer.querySelector('select').removeAttribute('required');
            }
        }

        checkbox.addEventListener('change', toggleElements);
        // Initialize state
        toggleElements();
    }

    // Set up visibility and required state toggles for each section
    const toggles = [
        ['sampleSet', 'sampleSetDesignContainer'],
        ['saveTheDate', 'saveTheDateDesignContainer'],
        ['invitationsEnvelopes', 'invitationsDesignContainer'],
        ['invitationsRsvpSet', 'invitationsRsvpSetDesignContainer'],
        ['invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesignContainer'],
        ['programs', 'programsDesignContainer'],
        ['menus', 'menusDesignContainer'],
        ['placeCards', 'placeCardsDesignContainer'],
        ['favourTags', 'favourTagsDesignContainer'],
        ['thankYouNoteCards', 'thankYouNoteCardsDesignContainer'],
        ['envelopeSeals', 'envelopeSealsDesignContainer'],
        ['senderAddressLabels', 'senderAddressLabelsDesignContainer']
    ];

    toggles.forEach(([checkboxId, designContainerId]) => toggleDesignElements(checkboxId, designContainerId));

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the form element
        const form = event.target;

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Collect all the checkbox inputs in the form
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        // Display an error message if no checkboxes are checked
        const errorMessage = document.getElementById('error-message');
        if (!anyChecked) {
            if (errorMessage) {
                errorMessage.textContent = 'Please select at least one option.';
                errorMessage.style.display = 'block'; // Show error message
            }
            return; // Exit function to prevent form submission
        } else {
            if (errorMessage) {
                errorMessage.textContent = '';
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

        // Ensure all checkboxes are included in the FormData object with "Yes" for checked and "No" for unchecked
        const data = {};
        checkboxes.forEach(checkbox => {
            const designSelect = form.querySelector(`select[name="${checkbox.id}Design"]`);

            if (checkbox.checked) {
                data[checkbox.id] = 'Yes';
                if (designSelect && !excludeDesigns.includes(designSelect.name)) {
                    data[designSelect.name] = designSelect.value; // Use value only if checkbox is checked
                }
            } else {
                data[checkbox.id] = 'No';
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
