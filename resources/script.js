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

// Handle conditional required fields functions
document.addEventListener('DOMContentLoaded', function() {
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

    // Function to collect and filter form data
    function getFilteredFormData() {
        const formData = new FormData(document.getElementById('orderForm'));
        const filteredData = {};

        formData.forEach((value, key) => {
            const checkbox = document.getElementById(key);

            if (checkbox && checkbox.type === 'checkbox' && checkbox.checked) {
                filteredData[key] = value;
            } else if (checkbox && checkbox.type !== 'checkbox') {
                filteredData[key] = value;
            }
        });

        return filteredData;
    }

    // Handle form submission
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Filter form data
        const filteredData = getFilteredFormData();
        const actionUrl = event.target.action; // Netlify form action URL

        fetch(actionUrl, {
            method: 'POST',
            body: new URLSearchParams(filteredData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.text())
        .then(result => {
            console.log('Form submitted successfully:', result);
            // Redirect or show a success message here
            window.location.href = 'thank-you.html'; // Redirect to thank you page
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            // Handle the error
        });
    });
});
