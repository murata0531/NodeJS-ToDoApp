var express = require("express");
const items = require("../../src/items");

// タスク関連ファイル
const create = require("../../src/tasks/create.js");
const list = require("../../src/tasks/list.js");
const search = require("../../src/tasks/search.js");
const once = require("../../src/tasks/get.js");
const update = require("../../src/tasks/update.js");
const del = require("../../src/tasks/delete.js");


// 組織所属API関連ファイル
const o_create = require("../../src/organization/create.js");
const o_get = require("../../src/organization/get.js");
const o_update = require("../../src/organization/update.js");
const o_delete = require("../../src/organization/delete.js");




var router = express.Router();

/* 商品一覧を取得するルーティング */
router.get("/items", function (req, res, next) {
  const itemsList = items.getListItem();
  res.send(itemsList);
});

/*１件の商品情報を取得するルーティング */
router.get("/items/:id", function (req, res, next) {
  const item = items.getItem(req.params.id);
  res.send(item);
});

/* タスクを登録するルーティング */
router.post("/tasks", async function (req, res, next) {
  console.log(req.body);
  const createTask = await create.postCreateTasks(req.body)
  res.send(createTask);
});

/* タスク一覧を取得するルーティング*/
router.get("/task-list", async function (req, res, next) {
  const listTasks = await list.getListTasks();
  res.send(JSON.stringify(listTasks));
});

/* タスクを絞り込み検索するルーティング*/
router.post("/task-search", async function (req, res, next) {
  const searchTask = await search.postSearchTask(req.body);
  res.send(searchTask);
});
/* タスクを1件取するルーティング */
router.get("/tasks/:id", async function (req, res, next) {
  const getTasksId = await once.getTasksId(req.params.id);
  res.send(getTasksId);
});
/* タスクを1件更新するルーティング */
router.patch("/tasks/:id", async function (req, res, next) {
  const patchTasksId = await update.patchTasksId(req.params.id, req.body);
  res.send(patchTasksId);
});

/* タスクを削除するルーティング */
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = await del.deleteTasksId(req.params.id);
  res.send(deleteTasksId);
});

/////////////////////////////////////////////////////////////
//  組織管理ユーザ関連API
/////////////////////////////////////////////////////////////

/* ユーザを1件取するルーティング */
router.get("/get/ouser/:id", async function (req, res, next) {
  const getUserId = await o_get.getUserId(req.params.id);
  res.send(getUserId);
});

/* 組織所属ユーザを登録するルーティング */
router.post("/regist/ouser", async function (req, res, next) {
  const createOuser = await o_create.postCreateOuser(req.body)
  res.send(createOuser);
});

/* ユーザを1件更新するルーティング */
router.patch("/update/ouser/:id", async function (req, res, next) {
  const patchUserId = await o_update.patchUserId(req.params.id, req.body);
  res.send(patchUserId);
});

/* ユーザを削除するルーティング */
router.delete("/delete/ouser/:id", async function (req, res, next) {
  const deleteUserId = await o_delete.deleteUserId(req.params.id);
  res.send(deleteUserId);
});



module.exports = router;
