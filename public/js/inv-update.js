'use strict'
// Enable the update button only when form fields are changed AND have 3+ characters
const form = document.querySelector("#updateForm")
if (form) {
  // Store original values when page loads
  const originalValues = new Map()
  const inputs = form.querySelectorAll("input, textarea")
  
  inputs.forEach(input => {
    originalValues.set(input, input.value.trim())
  })
  
  const validateForm = function () {
    const updateBtn = document.querySelector("#updateForm button[type='submit']")
    if (!updateBtn) return
    
    // Check if any input has been changed AND has valid length
    let hasValidChange = false
    inputs.forEach(input => {
      const currentValue = input.value.trim()
      const originalValue = originalValues.get(input)
      
      // Field must be changed AND have 3+ characters
      if (currentValue !== originalValue && currentValue.length >= 3) {
        hasValidChange = true
      }
    })
    
    // Enable or disable button based on validation
    if (hasValidChange) {
      updateBtn.removeAttribute("disabled")
    } else {
      updateBtn.setAttribute("disabled", "disabled")
    }
  }
  
  form.addEventListener("change", validateForm)
  form.addEventListener("input", validateForm)
}