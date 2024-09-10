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

    // Prevent mouse scrolling adjusting increments
    document.getElementById('guestCount').addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent scrolling
    });
    document.getElementById('budget').addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent scrolling
    });

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

        // Remove existing hidden inputs
        document.querySelectorAll('input[type="hidden"]').forEach(input => input.remove());

        // Function to update hidden inputs for checkbox values
        function updateHiddenInputs() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                const hiddenInputId = checkbox.id + '-hidden';
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = checkbox.name; // Ensure name matches checkbox
                hiddenInput.id = hiddenInputId;
                hiddenInput.value = checkbox.checked ? 'Yes' : 'No'; // Set value based on checkbox state
                event.target.appendChild(hiddenInput); // Append hidden input to the form
            });
        }

        updateHiddenInputs(); // Update hidden inputs

        // Get all checkboxes in the form
        const anyChecked = Array.from(document.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);

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

        // If validation passed, submit the form
        event.target.submit();
    }

    // Attach submit event listener to the form
    const form = document.querySelector('form[name="order-form"]');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
