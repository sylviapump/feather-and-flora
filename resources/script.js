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

document.addEventListener('DOMContentLoaded', function() {
    // Toggle visibility and required attributes for design elements
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        function toggleElements() {
            const isChecked = checkbox.checked;
            designSelect.style.display = isChecked ? 'block' : 'none';
            designSelect.setAttribute('aria-required', isChecked ? 'true' : 'false');
            isChecked ? designSelect.setAttribute('required', 'required') : designSelect.removeAttribute('required');
            designSelect.querySelector('option[value=""]').textContent = 'Select Design';
        }

        checkbox.addEventListener('change', toggleElements);
        toggleElements(); // Initialize state
    }

    // Apply toggle to all relevant elements
    const elements = [
        { checkboxId: 'sampleSet', designSelectId: 'sampleSetDesign' },
        { checkboxId: 'saveTheDate', designSelectId: 'saveTheDateDesign' },
        // Add other pairs here...
    ];
    elements.forEach(({ checkboxId, designSelectId }) => toggleDesignElements(checkboxId, designSelectId));

    // Format the budget input with a dollar sign
    function formatBudgetInput() {
        const budgetInput = document.getElementById('budget');

        budgetInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9.]/g, '');
            value = parseFloat(value).toFixed(2);
            e.target.value = value ? `$${value}` : '';
        });

        // Remove dollar sign before form submission
        document.querySelector('form').addEventListener('submit', function() {
            budgetInput.value = budgetInput.value.replace(/[^0-9.]/g, '');
        });
    }

    formatBudgetInput(); // Initialize budget formatting
});
