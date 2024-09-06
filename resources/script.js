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
    // Sample Set
    const sampleSetCheckbox = document.getElementById('sampleSet');
    const sampleSetDesignSelect = document.getElementById('sampleSetDesign');

    function toggleSampleSetRequired() {
        if (sampleSetCheckbox.checked) {
            sampleSetDesignSelect.setAttribute('aria-required', 'true');
            sampleSetDesignSelect.setAttribute('required', 'required');
            sampleSetDesignSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
        } else {
            sampleSetDesignSelect.removeAttribute('aria-required');
            sampleSetDesignSelect.removeAttribute('required');
            sampleSetDesignSelect.querySelector('option[value=""]').textContent = 'Select Design ';
        }
    }

    sampleSetCheckbox.addEventListener('change', toggleSampleSetRequired);

    // Save The Date Cards
    const saveTheDateCheckbox = document.getElementById('saveTheDate');
    const saveTheDateDesignSelect = document.getElementById('saveTheDateDesign');

    function toggleSaveTheDateRequired() {
        if (saveTheDateCheckbox.checked) {
            saveTheDateDesignSelect.setAttribute('aria-required', 'true');
            saveTheDateDesignSelect.setAttribute('required', 'required');
            saveTheDateDesignSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
        } else {
            saveTheDateDesignSelect.removeAttribute('aria-required');
            saveTheDateDesignSelect.removeAttribute('required');
            saveTheDateDesignSelect.querySelector('option[value=""]').textContent = 'Select Design ';
        }
    }

    saveTheDateCheckbox.addEventListener('change', toggleSaveTheDateRequired);

        // Invitations + Envelopes
        const invitationsEnvelopesCheckbox = document.getElementById('invitationsEnvelopes');
        const invitationsDesignSelect = document.getElementById('invitationsDesign');
    
        function toggleInvitationsRequired() {
            if (invitationsEnvelopesCheckbox.checked) {
                invitationsDesignSelect.setAttribute('aria-required', 'true');
                invitationsDesignSelect.setAttribute('required', 'required');
                invitationsDesignSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
            } else {
                invitationsDesignSelect.removeAttribute('aria-required');
                invitationsDesignSelect.removeAttribute('required');
                invitationsDesignSelect.querySelector('option[value=""]').textContent = 'Select Design ';
            }
        }
    
        invitationsEnvelopesCheckbox.addEventListener('change', toggleInvitationsRequired);
    
        // RSVP Cards + Envelopes
        const rsvpCardsEnvelopesCheckbox = document.getElementById('rsvpCardsEnvelopes');
        const rsvpDesignSelect = document.getElementById('rsvpDesign');
    
        function toggleRsvpRequired() {
            if (rsvpCardsEnvelopesCheckbox.checked) {
                rsvpDesignSelect.setAttribute('aria-required', 'true');
                rsvpDesignSelect.setAttribute('required', 'required');
                rsvpDesignSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
            } else {
                rsvpDesignSelect.removeAttribute('aria-required');
                rsvpDesignSelect.removeAttribute('required');
                rsvpDesignSelect.querySelector('option[value=""]').textContent = 'Select Design ';
            }
        }
    
        rsvpCardsEnvelopesCheckbox.addEventListener('change', toggleRsvpRequired);
    
        // Details Card
        const detailsCardCheckbox = document.getElementById('detailsCard');
        const detailsDesignSelect = document.getElementById('detailsDesign');
    
        function toggleDetailsRequired() {
            if (detailsCardCheckbox.checked) {
                detailsDesignSelect.setAttribute('aria-required', 'true');
                detailsDesignSelect.setAttribute('required', 'required');
                detailsDesignSelect.querySelector('option[value=""]').textContent = 'Select Design (required)';
            } else {
                detailsDesignSelect.removeAttribute('aria-required');
                detailsDesignSelect.removeAttribute('required');
                detailsDesignSelect.querySelector('option[value=""]').textContent = 'Select Design ';
            }
        }
    
        detailsCardCheckbox.addEventListener('change', toggleDetailsRequired);


});

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

    // Set up required state toggles for each section
    toggleDesignRequired('invitationsRsvpSet', 'invitationsRsvpSetDesign');
    toggleDesignRequired('invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesign');
    toggleDesignRequired('programs', 'programsDesign');
    toggleDesignRequired('menus', 'menusDesign');
    toggleDesignRequired('placeCards', 'placeCardsDesign');
    toggleDesignRequired('favourTags', 'favourTagsDesign');
    toggleDesignRequired('thankYouNoteCards', 'thankYouNoteCardsDesign');
    toggleDesignRequired('envelopeSeals', 'envelopeSealsDesign');
    toggleDesignRequired('otherCheckbox', 'additionalDetails');

    // Function to collect form data based on checked items
    function collectFormData() {
        const formData = {};

      // List of sections with their respective design select IDs
      const sections = [
        { checkboxId: 'sampleSet', designId: 'sampleSetDesign', label: 'Sample Set Design' },
        { checkboxId: 'saveTheDate', designId: 'saveTheDateDesign', label: 'Save The Date Design' },
        { checkboxId: 'invitationsEnvelopes', designId: 'invitationsDesign', label: 'Invitations Design' },
        { checkboxId: 'rsvpCardsEnvelopes', designId: 'rsvpDesign', label: 'RSVP Design' },
        { checkboxId: 'detailsCard', designId: 'detailsDesign', label: 'Details Card Design' },
        { checkboxId: 'invitationsRsvpSet', designId: 'invitationsRsvpSetDesign', label: 'Invitations + RSVP Set Design' },
        { checkboxId: 'invitationsRsvpDetailsSet', designId: 'invitationsRsvpDetailsSetDesign', label: 'Invitations + RSVP + Details Set Design' },
        { checkboxId: 'programs', designId: 'programsDesign', label: 'Programs Design' },
        { checkboxId: 'menus', designId: 'menusDesign', label: 'Menus Design' },
        { checkboxId: 'placeCards', designId: 'placeCardsDesign', label: 'Place Cards Design' },
        { checkboxId: 'favourTags', designId: 'favourTagsDesign', label: 'Favour Tags Design' },
        { checkboxId: 'thankYouNoteCards', designId: 'thankYouNoteCardsDesign', label: 'Thank You Note Cards Design' },
        { checkboxId: 'envelopeSeals', designId: 'envelopeSealsDesign', label: 'Envelope Seals Design' }
    ];

   // Collect data for each section
   sections.forEach(section => {
    const checkbox = document.getElementById(section.checkboxId);
    if (checkbox && checkbox.checked) {
        const designSelect = document.getElementById(section.designId);
        if (designSelect) {
            formData[section.label] = designSelect.value;
        }
    }
});
   
    }

    
});


