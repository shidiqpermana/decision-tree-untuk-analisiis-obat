// Main JavaScript for Drug Classification System

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Drug Classification System initialized');
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize charts if they exist
    initializeCharts();
});

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('predictionForm');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} harus diisi`;
    }
    
    // Specific validations
    switch (fieldName) {
        case 'age':
            if (value && (isNaN(value) || value < 1 || value > 100)) {
                isValid = false;
                errorMessage = 'Usia harus antara 1-100 tahun';
            }
            break;
        case 'na_to_k':
            if (value && (isNaN(value) || value < 0 || value > 50)) {
                isValid = false;
                errorMessage = 'Rasio Na to K harus antara 0-50';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'age': 'Usia',
        'sex': 'Jenis Kelamin',
        'bp': 'Tekanan Darah',
        'cholesterol': 'Kolesterol',
        'na_to_k': 'Rasio Na to K'
    };
    return labels[fieldName] || fieldName;
}

// Chart initialization
function initializeCharts() {
    // This will be called when results are displayed
    console.log('Charts ready for initialization');
}

// Utility functions
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

function showError(message) {
    // Create error alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function showSuccess(message) {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
function addLoadingToButton(button, text = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        ${text}
    `;
    button.disabled = true;
    
    return function removeLoading() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Form submission handler
function handleFormSubmission(form) {
    // Validate all fields
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showError('Mohon perbaiki kesalahan pada form sebelum melanjutkan');
        return false;
    }
    
    return true;
}

// Export functions for global use
window.DrugClassification = {
    validateField,
    showFieldError,
    clearFieldError,
    showError,
    showSuccess,
    showLoading,
    hideLoading,
    addLoadingToButton,
    handleFormSubmission,
    formatNumber
};
