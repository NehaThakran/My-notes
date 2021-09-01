
const addButton = document.querySelector('#add');

// localStorage and sessionStorage allow us to save key/value pairs in a web Browser.localStorage Object stores data 
// with no expiration Date. The data will not be deleted when browser is closed
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes)); //localStorage stores data in form of string only
}

const addNewNote = (text = '') => {
    //one way to dynamically add div and classes
    const note = document.createElement('div');
    note.classList.add('note'); //it will add a note class to the div

    //another way - we can simply add html part insid string templates
    const htmlData = `
    <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}  "></div> 
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    //to add this operation div inside the note div,use insertAdjacentHTML, much faster than innerHTML
    note.insertAdjacentHTML('afterbegin', htmlData);

    //getting the references
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deletion
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    //toggle using edit icon - ony one out of div or textarea should remain active and should toggle when user clicks the edit icon

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = text;
        updateLSData(); //update data to local storage of browser
    })

    document.body.appendChild(note);

}

//getting data back from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));//notes is my key

if(notes){ notes.forEach((note) => addNewNote(note) )}; //if there are notes, they should always appear in our textarea

addButton.addEventListener('click', () => addNewNote());