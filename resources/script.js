document.addEventListener('DOMContentLoaded', function () {
    // Function to close navbar when a link is clicked
    function closeNavbar() {
        const navToggler = document.querySelector('.navbar-toggler');
        if (navToggler) {
            const navCollapse = document.querySelector('.navbar-collapse');
            const icon = navToggler.querySelector('span');
            if (navCollapse && icon && navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                icon.classList.replace('fa-times', 'navbar-toggler-icon');
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
        weddingDateInput.setAttribute('min', today);
    }

    // Prevent mouse scrolling adjusting increments
    function preventScrollAdjustment(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('wheel', function (event) {
                event.preventDefault();
            });
        }
    }

    preventScrollAdjustment('guestCount');
    preventScrollAdjustment('budget');

    // Toggle visibility and required attributes
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        if (!checkbox || !designSelect) return;

        function toggleElements() {
            if (checkbox.checked) {
                designSelect.style.display = 'block';
                designSelect.setAttribute('aria-required', 'true');
                designSelect.setAttribute('required', 'required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            } else {
                designSelect.style.display = 'none';
                designSelect.removeAttribute('aria-required');
                designSelect.removeAttribute('required');
                designSelect.querySelector('option[value=""]').textContent = 'No';
            }
        }

        checkbox.addEventListener('change', toggleElements);
        toggleElements();
    }

    // Set up visibility and required state toggles
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

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Update checkbox values to "Yes" for checked items
        function updateCheckboxValues() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.value = checkbox.checked ? 'Yes' : 'No';
            });
        }

        updateCheckboxValues();

        // Filter out empty fields
        function getFilteredFormData(form) {
            const formData = new FormData(form);
            const filteredData = {};
            for (const [key, value] of formData.entries()) {
                if (value.trim() !== "" && !key.startsWith("honeypot")) {
                    filteredData[key] = value;
                }
            }
            return filteredData;
        }

        const form = document.querySelector('form[name="order-form"]');
        if (form) {
            const filteredData = getFilteredFormData(form);

            // Display or hide error message based on form data
            const errorMessage = document.getElementById('error-message');
            if (Object.keys(filteredData).length === 0) {
                if (errorMessage) errorMessage.style.display = 'block';
                return;
            } else {
                if (errorMessage) errorMessage.style.display = 'none';
            }

            // Submit form data via fetch
            fetch(form.action, {
                method: form.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filteredData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    window.location.href = form.action; // Redirect to thank-you page
                })
                .catch(error => console.error('Error:', error));
        }
    }

    const form = document.querySelector('form[name="order-form"]');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
