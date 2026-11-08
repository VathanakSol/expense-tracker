document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalEl = document.getElementById('total');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((exp, i) => {
      total += exp.amount;
      const li = document.createElement('li');
      li.innerHTML = `${exp.name} - $${exp.amount.toFixed(2)} <button class="delete" data-index="${i}">Delete</button>`;
      expenseList.appendChild(li);
    });
    totalEl.textContent = total.toFixed(2);

    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        expenses.splice(idx, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      });
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    form.reset();
  });
});