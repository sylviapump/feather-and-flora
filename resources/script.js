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
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
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

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const guestCount = document.getElementById('guestCount');
            if (guestCount) {
                console.log('Guest Count:', guestCount.value);
            } else {
                console.error('Guest Count input not found.');
            }
        });
    }
});
