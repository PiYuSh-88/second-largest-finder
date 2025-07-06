document.addEventListener('DOMContentLoaded', function() {
    const inputDisplay = document.getElementById('input-display');
    const resultDisplay = document.getElementById('result');
    let inputStr = '';

    function updateDisplay() {
        inputDisplay.textContent = inputStr;
    }

    document.querySelectorAll('.btn[data-value]').forEach(btn => {
        btn.addEventListener('click', function() {
            const val = this.getAttribute('data-value');
            // Prevent consecutive commas or starting with comma
            if (val === ',') {
                if (inputStr === '' || inputStr.endsWith(',')) return;
            }
            inputStr += val;
            updateDisplay();
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        inputStr = '';
        updateDisplay();
        resultDisplay.textContent = '';
    });

    document.getElementById('find').addEventListener('click', function() {
        if (!inputStr || inputStr.endsWith(',')) {
            resultDisplay.textContent = 'Please enter a valid list.';
            return;
        }
        fetch('/find-second-largest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numbers: inputStr })
        })
        .then(res => res.json())
        .then(data => {
            if (data.second_largest !== undefined) {
                resultDisplay.textContent = 'Second Largest: ' + data.second_largest;
            } else if (data.error) {
                resultDisplay.textContent = data.error;
            } else {
                resultDisplay.textContent = 'Unexpected error.';
            }
        })
        .catch(() => {
            resultDisplay.textContent = 'Server error.';
        });
    });

    updateDisplay();
}); 
