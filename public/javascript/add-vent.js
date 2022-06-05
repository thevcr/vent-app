async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="vent-title"]').value;
    const vent_text = document.querySelector('input[name="vent-text"]').value;
  
    const response = await fetch(`/api/vents`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        vent_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-vent-form').addEventListener('submit', newFormHandler);