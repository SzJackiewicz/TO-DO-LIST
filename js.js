let $todoInput; //pole na wpisanie treści zadania
let $alertInfo; //info o braku zadań - konieczność wpisania tekstu
let $addBtn; //przycisk ADD
let $ulList; //lista zadań, tagi UL
let $newTask; //nowe zadanie

let $popup //pobrany popup
let $poputInfo //alert w popupie, jak się nie doda treści zadania
let $editedTodo //edytowany Todo
let $popupInput //tekst wprowadzany do inputa
let $addPopupBtn //przycisk zatwierdź
let $closeTodoBtn //przycisk anuluj
let $idNumber = 0; // dzieki temu kazdy nowy element dostanie swoje id
let $allTask;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

//pobieramy  elementy
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    
    $popup = document.querySelector('.popup')
    $poputInfo = document.querySelector('.popupInfo')
    $popupInput = document.querySelector('.popupInput')
    $addPopupBtn = document.querySelector('.accept')
    $closeTodoBtn = document.querySelector('.cancel')

    $allTask = $ulList.getElementsByTagName('li');
};

//nadajemy nasłuchiwanie na przycisk ADD
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck); //wywołujemy funkcje po wpisaniu entera
};

const addNewTask = () => {
    if ($todoInput.value !== '') {
      $idNumber++; //zwiększam nr id po dodaniu kolejnego, ta zmienna utworzona jest na samej górze i ma przypisane id 0
      $newTask = document.createElement('li');
      $newTask.innerText = $todoInput.value;
      //właściwość innerText pozwala dodać do html juz ostylowany tekst
      $newTask.setAttribute('id', `todo-${$idNumber}`);
      //po utworzeniu zadania przypisuje mu powiększone wcześniej id
      $ulList.appendChild($newTask);
      $todoInput = ''; //wyczyść value jeśli wszystkie funkcje powyzsze sie wykonają
      //jeśli todoInput (czyli lista) nie jest pusta
      //to dodaj element new task jako li
      $alertInfo.innerText = '';
      createToolsArea(); //funkcja dodająca do li przyciski i stylująca je
    } else {
    $alertInfo.innerText = 'Wpisz treść zadania!';
  }
};

//zeby mozna było zatwierdzić wpisanie nowego taska enterem
const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const createToolsArea = () => {
  //tworzę funkcję i deklaruję w niej zmienne tworzące elementy:
  //zmienna toolsPanel - czyli zmienna główna przechowująca przyciski
  //zmienna complete BTN czyli ptaszek, EDIT - przycisk edycji i complete czyli krzyzyk
  //po utworzeniu zmiennej, dodaję do niej klasy z CSS odpowiadające za stylowanie
  //na samym końcu zmienne edyt, ptaszek i krzyzyk przypisuje do tools panel
  //ta fukcja będzie wywołana w funkcji add new task, czyli przy tworzeniu zadania

  const toolsPanel = document.createElement('div');
  toolsPanel.classList.add('tools');
  $newTask.appendChild(toolsPanel);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  //właściwość innerHTML pozwala dodać element html, czyli div, span, czy np. fas ikonę

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.innerHTML = 'EDIT';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => { //e jest wartością dowolną, chodzi o to aby funkcja miała argument. ta funkcja jest klikiem, co jest określone na górze w prepareDOMEvents
     
    //dosłowwnie: czy nasz target e, zawiera klasę complete
    if (e.target.closest('button').classList.contains('complete')) {
        //właściwość closest pomaga wtedy, kiedy user kliknie w ikonę zamiast button
        //ona wtedy szuka najblizszego przycisku 
        e.target.closest('li').classList.toggle('completed')
        //podobnie jak wyzej: jesli klikne target to najblizsze li, czyli te, w ktorym jest button, zmieni styl na przekreslony tekst. daje toggle aby mozna było to kliknąć i odkliknąć
        e.target.closest('button').classList.toggle('completed');
        //zmiana stylu dla ptaszka na wyszarzony 
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
        //co ma się wykonać jeśli klikniemy edit
    } else if (e.target.closest('button').className === 'delete') {
            deleteTask(e);
    }
    //co ma się wykonać jeśli klikniemy delete
};

//po naciśnięciu przycisku edit wyskakuje popup bo dodaję mu styl display flex
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    //przypisuję obecną treść do nowej zmiennej olt to do (?)
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};

//sprawdzamy czy w popupInput znajduje się treść
const changeTodo = () => {
    if ($popupInput.value != '') {
        $editedTodo.firstChild.textContent = $poputInput.value;
        $popup.style.display = 'none'; //zamknij popup
        $popupInfo.innerText = ''; //wyczyść alert o treści jeśli treść jest wpisana
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść'
        $popupInfo.innerText = ''; 
    };
};

//po naciśnięciu przycisku anuluj znika popup bo dodaję mu styl display none
const closePopup = () => {
    $popup.style.display = 'none';
};

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if ($allTask.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście';
    }
}

//po tym jak przeglądarka wczyta cały html i css - czyli DOM - wtedy odpala się funkcja main
//która zawiera resztę funkcji
document.addEventListener('DOMContentLoaded', main);
