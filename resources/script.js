// Custom JavaScript 

 // Function to close navbar when link is clicked
 function closeNavbar() {
    var navToggler = document.querySelector('.navbar-toggler');
    var navCollapse = document.querySelector('.navbar-collapse');
    var icon = navToggler.querySelector('span');

    if (navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
        // Change the toggle icon back to the default state
        if (icon.classList.contains('fa-times')) {
            icon.classList.remove('fa-times');
            icon.classList.add('navbar-toggler-icon');
        }
    }
}

// Toggle navbar icon between default and 'X' icon
var navbarToggler = document.querySelector('.navbar-toggler');

navbarToggler.addEventListener('click', function () {
    var icon = navbarToggler.querySelector('span');
    if (icon.classList.contains('navbar-toggler-icon')) {
        icon.classList.remove('navbar-toggler-icon');
        icon.classList.add('fa', 'fa-times');
    } else {
        icon.classList.remove('fa', 'fa-times');
        icon.classList.add('navbar-toggler-icon');
    }
});

// Handle conditional required fields
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the required attribute for design selects based on checkbox state
    function toggleDesignRequired(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        function toggleRequired() {
            if (checkbox.checked) {
                designSelect.setAttribute('aria-required', 'true');
                designSelect.setAttribute('required', 'required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
            } else {
                designSelect.removeAttribute('aria-required');
                designSelect.removeAttribute('required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design ';
            }
        }

        checkbox.addEventListener('change', toggleRequired);
        // Initialize state
        toggleRequired();
    }

    // List of sections with their respective design select IDs
    const sections = [
        { checkboxId: 'sampleSet', designId: 'sampleSetDesign' },
        { checkboxId: 'saveTheDate', designId: 'saveTheDateDesign' },
        { checkboxId: 'invitationsEnvelopes', designId: 'invitationsDesign' },
        { checkboxId: 'rsvpCardsEnvelopes', designId: 'rsvpDesign' },
        { checkboxId: 'detailsCard', designId: 'detailsDesign' },
        { checkboxId: 'invitationsRsvpSet', designId: 'invitationsRsvpSetDesign' },
        { checkboxId: 'invitationsRsvpDetailsSet', designId: 'invitationsRsvpDetailsSetDesign' },
        { checkboxId: 'programs', designId: 'programsDesign' },
        { checkboxId: 'menus', designId: 'menusDesign' },
        { checkboxId: 'placeCards', designId: 'placeCardsDesign' },
        { checkboxId: 'favourTags', designId: 'favourTagsDesign' },
        { checkboxId: 'thankYouNoteCards', designId: 'thankYouNoteCardsDesign' },
        { checkboxId: 'envelopeSeals', designId: 'envelopeSealsDesign' },
        { checkboxId: 'otherCheckbox', designId: 'additionalDetails' }
    ];

    // Apply required state toggles for each section
    sections.forEach(section => toggleDesignRequired(section.checkboxId, section.designId));

    // Function to collect form data based on checked items
    function collectFormData() {
        const formData = {};

        // Collect data for each section
        sections.forEach(section => {
            const checkbox = document.getElementById(section.checkboxId);
            if (checkbox && checkbox.checked) {
                const designSelect = document.getElementById(section.designId);
                if (designSelect) {
                    const value = designSelect.value.trim();
                    if (value) {
                        formData[section.checkboxId.replace(/([A-Z])/g, ' $1').trim() + ' Design'] = value;
                    }
                }
            }
        });

        // Handle 'Other' section
        const otherCheckbox = document.getElementById('otherCheckbox');
        if (otherCheckbox && otherCheckbox.checked) {
            const additionalDetails = document.getElementById('additionalDetails').value.trim();
            if (additionalDetails) {
                formData['Additional Details'] = additionalDetails;
            }
        }

        return formData;
    }

    // Example function to format and send email
    function sendEmail() {
        const formData = collectFormData();

        // Convert formData to a string for email body
        let emailBody = 'Here are the details submitted:\n\n';
        for (const [key, value] of Object.entries(formData)) {
            emailBody += `${key}: ${value}\n`;
        }

        // Example placeholder for sending email
        console.log('Sending email with body:', emailBody);
    }

    // Add event listener to the submit button (assuming there's one with id 'submitForm')
    const submitButton = document.getElementById('submitForm');
    if (submitButton) {
        submitButton.addEventListener('click', sendEmail);
    }
});
