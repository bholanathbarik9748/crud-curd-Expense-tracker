// variable declaration
const date = document.getElementById('date');
const Description = document.getElementById('description');
const Category = document.getElementById('category');
const amount = document.getElementById('amount');
const tbody = document.querySelector('tbody');
const form = document.querySelector('.add-form');

// add Event Listener
form.addEventListener('submit', add_data_into_table);
tbody.addEventListener('click', deleteList);
document.addEventListener('DOMContentLoaded', function () {
    dataLoader();
});

// Data add in table
function add_data_into_table(e) {
    e.preventDefault();
    console.log('Its Work');

    const original_Data_obj = {
        date: date.value,
        Description: Description.value,
        Category: Category.value,
        amount: amount.value,
        id: 0,
    }
    create_Table(original_Data_obj);
    data_Saver(original_Data_obj);
    form.reset();
}

// Save data
function data_Saver(data) {
    axios.post("https://crudcrud.com/api/f354a3a768214dd8ba44a2ab18f1c987/Expense_Tracker", data)
        .then(res => {
            show_User(res.data);
            console.log(res)
        })
        .catch(err => console.log(err));
}

// Load data
function dataLoader() {
    axios.get("https://crudcrud.com/api/f354a3a768214dd8ba44a2ab18f1c987/Expense_Tracker")
        .then(res => {
            for(var it = 0;it < res.data.length;it++){
                create_Table(res.data[it]);
                console.log(res.data[it]);
            }
            console.log(res)
        })
        .catch(err => console.log(err));
}

// Delete Row
function deleteList(data) {
    let table_row;
    table_row = data.target.closest('tr');
    console.log(table_row);
    const id = data.target.parentElement.parentElement._id;
    console.log(id);
    axios.delete(`https://crudcrud.com/api/f354a3a768214dd8ba44a2ab18f1c987/Expense_Tracker/${id}`)
        .then(res => {
            console.log(res);
            table_row.remove();
        })
        .catch(err => console.log(err));
}

// create Row 
function create_Table(data) {
    const expenseRow = document.createElement('tr');
    expenseRow.id = data.id;

    const dateTd = document.createElement('td');
    dateTd.classList = 'date-row';
    dateTd.textContent = data.date;

    const descriptionTd = document.createElement('td');
    descriptionTd.classList = 'description-row';
    descriptionTd.textContent = data.Description;

    const categoryTd = document.createElement('td');
    categoryTd.classList = 'category-row';
    categoryTd.textContent = data.Category;

    const amountTd = document.createElement('td');
    amountTd.classList = 'amount-row';
    amountTd.textContent = data.amount;

    const idTd = document.createElement('td');
    idTd.classList = 'id-row';
    idTd.textContent = data.id;


    const deleteTd = document.createElement('td');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList = 'fas fa-minus-circle delete-icon';

    expenseRow.appendChild(dateTd);
    expenseRow.appendChild(descriptionTd);
    expenseRow.appendChild(categoryTd);
    expenseRow.appendChild(amountTd);
    expenseRow.appendChild(deleteTd);
    expenseRow.appendChild(idTd);
    deleteTd.appendChild(deleteIcon);
    tbody.appendChild(expenseRow);
}