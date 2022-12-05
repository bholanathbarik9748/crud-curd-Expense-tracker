function Save_data(event) {
    event.preventDefault();
    const Amount = event.target.Amount.value;
    const Description = event.target.Description.value;
    const category = event.target.category.value;

    const obj = {
        Amount,
        Description,
        category
    }

    axios.post("https://crudcrud.com/api/649bad67aa32404da3788a0aae30e788/Expense_Tracker", obj)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    Show_data(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/649bad67aa32404da3788a0aae30e788/Expense_Tracker")
        .then((res) => {
            console.log(res)
            for (var i = 0; i < res.data.length; i++) {
                Show_data(res.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

function Show_data(user) {
    const parentNode = document.getElementById("ListOfUsers");
    console.log(user);
    const childHTML = `<li id=${user._id}>Amount:${user.Amount}-Description:${user.Description}-category:${user.category}<button onclick=deleteUser('${user._id}')>Delete User</button class="btn btn-danger"><button onclick=EditUserDetails('${user.Amount}','${user.Description}','${user.category}','${user._id}') class="edt" class="btn btn-danger"> Edit User </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/649bad67aa32404da3788a0aae30e788/Expense_Tracker/${userId}`)
        .then((res) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })
}

function EditUserDetails(userId) {
axios.get(`https://crudcrud.com/api/649bad67aa32404da3788a0aae30e788/Expense_Tracker/${userId}`)
console.log("inside EditUserDetails", userId);
deleteUser(userId);
console.log(Amount, Description, category, userId);

}

itemlist.addEventListener("click", editfun);

function editfun(e) {
    if (e.target.classList.contains("edt")) {
        var li = e.target.parentElement;
        //  console.log(li)
        let amt = li.childNodes[1].textContent; 
        let dis = li.childNodes[2].textContent;
        let cat = li.childNodes[4].textContent;
        // console.log(amt,dis,cat)
        let v1 = document.getElementById("inp1");
        let v2 = document.getElementById("inp2");
        let v3 = document.getElementById("inp3");
        v1.value = amt;
        v2.value = dis;
        v3.value = cat;
        datadelte(dis);
        itemlist.removeChild(li);
    }
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById("ListOfUsers")
    const ChildNodetoBeDeleted = document.getElementById(userId)
    parentNode.removeChild(ChildNodetoBeDeleted)

}