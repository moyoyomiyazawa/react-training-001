/**
 * タスク追加時の処理
 * @returns void
 */
const addTask = () => {
  const addTextInput = document.getElementById('add-text');
  const taskName = addTextInput.value;
  if (taskName.length === 0) {
    alert('文字を入力してください');
    return;
  }
  document.getElementById('todo-list').appendChild(createTaskElement(taskName));
  // タスク追加フォームを空にする
  addTextInput.value = '';
};

/**
 * 完了ボタン押下時の処理
 * 完了エリアにタスクを移動する
 * @param {Event} e
 */
const onClickComplete = (e) => {
  const taskElement = e.target.closest('li');
  const taskName = taskElement.querySelector('div > div > span').textContent;
  // 完了エリアにタスクを追加
  document
    .getElementById('done-list')
    .prepend(createTaskElement(taskName, true));
  // 未完了エリアからタスクを削除
  taskElement.remove();
};

/**
 * 削除ボタン押下時の処理
 * @param {Event} e
 */
const onClickDelete = (e) => {
  e.target.closest('li').remove();
};

/**
 * 戻すボタン押下時の処理
 * @param {Event} e イベントオブジェクト
 */
const onClickReturn = (e) => {
  const taskElement = e.target.closest('li');
  const taskName = taskElement.querySelector('div > div > span').textContent;
  // todoエリアにタスクを移動
  document
    .getElementById('todo-list')
    .appendChild(createTaskElement(taskName, false));
  taskElement.remove();
};


/**
 * タスク要素を作成する
 * @param {string} taskName タスク名
 * @param {boolean} isCompleted 完了時かどうかの真偽値
 * @returns タスク要素オブジェクト
 */
const createTaskElement = (taskName, isCompleted = false) => {
  const taskElement = document.createElement('li');

  // 完了ボタン押下時
  if (isCompleted) {
    taskElement.innerHTML = `
<div class="grid grid-cols-2 py-1">
  <div>
    <span class="mr-2">${taskName}</span>
  </div>
  <div class="text-right">
    <button class="rounded-xl border py-0 px-4 bg-gray-100 hover:bg-white" onclick="onClickReturn(event)">戻す</button>
  </div>
</div>
`;
    return taskElement;
  }

  // 戻すボタン押下時
  taskElement.innerHTML = `
<div class="grid grid-cols-2 py-1">
  <div>
    <span class="mr-2">${taskName}</span>
  </div>
  <div class="text-right">
    <button class="rounded-xl border py-0 px-4 bg-gray-100 hover:bg-white" onclick="onClickComplete(event)">完了</button>
    <button class="rounded-xl border py-0 px-4 bg-gray-100 hover:bg-white" onclick="onClickDelete(event)">削除</button>
  </div>
</div>
`;
  return taskElement;
};

// 追加ボタンクリック時
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => addTask());

// タスク追加フォームでEnterを押したときの処理
const addText = document.getElementById('add-text');
addText.addEventListener('keydown', (e) => {
  // 日本語の変換時のEnterは除外する
  if (e.isComposing) return;
  if (e.key == 'Enter') return addTask();
});
