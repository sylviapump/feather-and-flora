// Custom JavaScript

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
document.addEventListener('DOMContentLoaded', function() {
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

    // Prevent mouse scrolling adjusting increments
    const guestCountElement = document.getElementById('guestCount');
    if (guestCountElement) {
        guestCountElement.addEventListener('wheel', function (event) {
            event.preventDefault(); // Prevent scrolling
        });
    }

    const budgetElement = document.getElementById('budget');
    if (budgetElement) {
        budgetElement.addEventListener('wheel', function (event) {
            event.preventDefault(); // Prevent scrolling
        });
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

        // Function to update checkbox values to "Yes" for checked items
        function updateCheckboxValues() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.value = checkbox.checked ? 'Yes' : 'No';
            });
        }

        updateCheckboxValues(); // Update checkbox values

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

        // If validation passed, submit the form
        event.target.submit();
    }

    // Attach submit event listener to the form
    const form = document.querySelector('form[name="order-form"]');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
