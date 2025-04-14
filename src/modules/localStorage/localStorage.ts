import type { lsDataType, lsKeyType, lsTimeDataType } from "../api";

export {
  setProgressToLocalStorage,
  setTimeToLocalStorage,
  getProgressFromLocalStorage,
  getTimeFromLocalStorage
};

//С точки зрения DRY неправильно, но исключительно для прозрачности
function setProgressToLocalStorage(data:lsDataType|null=null, key:lsKeyType="my"):void{
  if (!data) localStorage.removeItem(String(key));
  else localStorage.setItem(key,JSON.stringify(data));
}

function setTimeToLocalStorage(data:lsTimeDataType|null=null, key:lsKeyType="time"):void{
  if (!data) localStorage.removeItem(String(key));
  else localStorage.setItem(key,JSON.stringify(data));
}

function getProgressFromLocalStorage(key:lsKeyType="my"):lsDataType|null{
  const rawData = localStorage.getItem(String(key))
  const response:lsDataType|null = rawData?JSON.parse(rawData):null;
  return response;
}

function getTimeFromLocalStorage(key:lsKeyType = "time"):lsTimeDataType|null{
  const rawData = localStorage.getItem(String(key))
  const response:lsTimeDataType|null = rawData?JSON.parse(rawData):null;
  return response;
}
