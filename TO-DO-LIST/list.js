const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something kiddo !");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML = inputBox.value;

        

        //delete cross
        let span=document.createElement("span");
        span.innerHTML="\u00d7";

        //  edit button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("edit-btn"); //use in html 

        li.appendChild(editBtn);
        li.appendChild(span);
        listContainer.appendChild(li);

    }
    inputBox.value=" ";
    saveData();
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.classList.contains("edit-btn")) {
        let li = e.target.parentElement;
        let oldValue = li.firstChild.textContent;

        let input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;
        input.classList.add("edit-input");

        li.innerHTML = ""; // Clear current text
        li.appendChild(input);

        // Save button for confirming edit
        let saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.classList.add("save-btn");
        li.appendChild(saveBtn);

        saveBtn.addEventListener("click", function () {
            if (input.value.trim() !== "") {
                li.innerHTML = input.value;

                // Re-add edit and delete buttons
                let editBtn = document.createElement("button");
                editBtn.innerText = "Edit";
                editBtn.classList.add("edit-btn");

                let deleteBtn = document.createElement("span");
                deleteBtn.innerHTML = "\u00d7";
                deleteBtn.classList.add("delete-btn");

                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                saveData();
            }
        });
    }


},false);
 function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
 }
 function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
 }
 showTask();