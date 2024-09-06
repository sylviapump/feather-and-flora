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
    // Function to toggle visibility and required attributes
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

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
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            }
        }

        checkbox.addEventListener('change', toggleElements);
        // Initialize state
        toggleElements();
    }

    // Set up visibility and required state toggles for each section
    toggleDesignElements('sampleSet', 'sampleSetDesign');
    toggleDesignElements('saveTheDate', 'saveTheDateDesign');
    toggleDesignElements('invitationsEnvelopes', 'invitationsDesign');
    toggleDesignElements('rsvpCardsEnvelopes', 'rsvpDesign');
    toggleDesignElements('detailsCard', 'detailsDesign');
    toggleDesignElements('invitationsRsvpSet', 'invitationsRsvpSetDesign');
    toggleDesignElements('invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesign');
    toggleDesignElements('programs', 'programsDesign');
    toggleDesignElements('menus', 'menusDesign');
    toggleDesignElements('placeCards', 'placeCardsDesign');
    toggleDesignElements('favourTags', 'favourTagsDesign');
    toggleDesignElements('thankYouNoteCards', 'thankYouNoteCardsDesign');
    toggleDesignElements('envelopeSeals', 'envelopeSealsDesign');
    toggleDesignElements('otherCheckbox', 'otherTextBox');
});



