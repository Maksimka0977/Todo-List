const taskInput = document.querySelector("#taskInput");
const form = document.querySelector("#form");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  console.log(localStorage.getItem("tasks"));
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmpyList();

form.addEventListener("submit", addTask);
function addTask(event) {
  event.preventDefault();

  // Достаем текст задачи
  const taskText = taskInput.value.trim();
  taskInput.value = "";

  // Описываем задачу ввиде обьекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // Добавление задачи в конец масива
  tasks.push(newTask); // Добавление Элемeнтов с обьекта в массив

  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  renderTask(newTask);

  checkEmpyList();
}

tasksList.addEventListener("click", deleteTask);
function deleteTask(event) {
  //Проверяем если клик был НЕ по кнопке "Удалить задачу"
  if (event.target.dataset.action !== "delete") {
    return;
  }

  //Проверяем чтобы клик был по кнопке удалить
  const parentNode = event.target.closest("li");
  parentNode.remove();

  // Определяем ID задачи
  const id = Number(parentNode.id);
  console.log(id);

  // Находим индекс задачи в массиве
  //findIndex - запускает функцию по очереди для каждого элемента массива
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  //   tasks = tasks.filter(function(task){
  // 	if(task.id === id){
  // 		return false
  // 	} else {
  // 		return true
  // 	}
  //   }
  // info gpt

  console.log(index);

  // Удаление задачи из массива
  tasks.splice(index, 1);

  checkEmpyList();
}

tasksList.addEventListener("click", doneTask);
function doneTask(event) {
  // Проверяем, был ли клик по кнопке "Задача выполнена"
  if (event.target.dataset.action !== "done") {
    return;
  }

  // Определение ID задачи
  const parentNode = event.target.closest("li");
  const id = Number(parentNode.id);

  // Находим задачу по ID
  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });

  // Переключение состояние в массиве
  task.done = !task.done;

  console.log(task);

  // Проверка, что клик был по кнопке "Задача выполнена"
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();
}

function checkEmpyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
	<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
	<div class="empty-list__title">Список дел пуст</div>
</li>`;

    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";
  const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
		<span class="${cssClass}">${task.text}</span>
		<div class="task-item__buttons">
		  <button type="button" data-action="done" class="btn-action">
			 <img src="./img/tick.svg" alt="Done" width="18" height="18">
		  </button>
		  <button type="button" data-action="delete" class="btn-action">
			 <img src="./img/cross.svg" alt="Delete" width="18" height="18">
		  </button>
		</div>
	 </li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
}

// save to LocalStorage
