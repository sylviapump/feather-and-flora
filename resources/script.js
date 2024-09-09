// Function to close the navbar and toggle the icon
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

    // Set minimum date for the wedding date input
    const today = new Date().toISOString().split('T')[0];
    const weddingDateInput = document.getElementById('weddingDate');
    if (weddingDateInput) {
        weddingDateInput.setAttribute('min', today);
    }

    // Function to toggle visibility and required attributes of design elements
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        if (!checkbox || !designSelect) return; // Exit if elements don't exist

        function toggleElements() {
            if (checkbox.checked) {
                designSelect.style.display = 'block'; // Show design select
                designSelect.setAttribute('aria-required', 'true');
                designSelect.setAttribute('required', 'required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            } else {
                designSelect.style.display = 'none'; // Hide design select
                designSelect.removeAttribute('aria-required');
                designSelect.removeAttribute('required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            }
        }

        checkbox.addEventListener('change', toggleElements);
        toggleElements(); // Initialize state
    }

    // Set up toggles for each checkbox and design select
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

    // Function to validate the form before submission
    function validateForm(event) {
        const anyCheckboxChecked = toggles.some(([checkboxId]) => {
            const checkbox = document.getElementById(checkboxId);
            return checkbox && checkbox.checked;
        });

        if (!anyCheckboxChecked) {
            document.getElementById('error-message').style.display = 'block'; // Show error message
            event.preventDefault(); // Prevent form submission
        } else {
            document.getElementById('error-message').style.display = 'none'; // Hide error message
        }
    }

    // Function to handle form submission
    function handleSubmit(event) {
        // Get the form element
        const form = event.target;

        // Collect all the checkbox inputs in the form
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');

        // Loop through each checkbox
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                // Remove unchecked checkboxes from the form data
                const checkboxWrapper = checkbox.closest('label');
                if (checkboxWrapper) {
                    checkboxWrapper.style.display = 'none'; // Hide the unchecked checkboxes
                }
            }
        });

        // Remove the entire label if it contains only hidden checkboxes
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            if (label.style.display === 'none') {
                label.remove();
            }
        });

        // Continue with form submission
        return true; // Proceed with the form submission
    }
    // Attach submit event listener to the form
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});
