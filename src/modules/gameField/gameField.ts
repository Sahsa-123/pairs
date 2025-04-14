import { setProgressToLocalStorage, getProgressFromLocalStorage } from "../localStorage"
import type{ lsDataType, lsKeyType } from "../api";

export {
  createGameZone,
  restoreGameZone,
  getGameZone,
  setGamezoneClickState,
  setGamezoneTimerState
}

function createGameZone(pairs:number, theme:lsDataType["theme"]='shrek'){
  setGamezoneTimerState("false", getGameZone())
  clearGameZone();
  const data = initGameData(pairs,theme)
  const gameZone = getGameZone()
  gameZone.style.aspectRatio = "";
  displayGame(data, gameZone)
  setProgressToLocalStorage(data);
}

function restoreGameZone(key:lsKeyType='my'):void {
  clearGameZone();
  const data = getProgressFromLocalStorage(key);

  const gameZone = getGameZone()
  gameZone.style.aspectRatio = "";
  if(!data){
    if (document.documentElement.scrollWidth <= 576)gameZone.style.aspectRatio = "1/1";
    else gameZone.style.aspectRatio = "2/1";
    return;
  };

  displayGame(data, gameZone)
}

function getGameZone():HTMLElement{
  return document.getElementById('game-zone') as HTMLElement
}

function setGamezoneClickState(state:"true"|"false", gameZone:HTMLElement):void{
  gameZone.dataset.clickDisabled = state
}

function setGamezoneTimerState(state:"true"|"false", gameZone:HTMLElement):void{
  gameZone.dataset.timerDisabled = state
}
//================helpers===============
function generateList(pairsAmount:number):number[]{
  let arr:number[] = [];
  for(let i=1; i<=pairsAmount; ){
    arr.push(i);
    if (arr.length%2==0)i++;
  }
  return arr;
}

function shuffleList(array:number[]):number[]{
  const arrMaxIndex=(array.length)-1;
  for(let i=arrMaxIndex;i>=1;i--){
    const j = Math.round(Math.random()*arrMaxIndex);
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}

function initGameData(pairs:number, theme:lsDataType["theme"]='shrek'):lsDataType{
  const indexes = shuffleList(generateList(pairs));
  const ids = [];
  for (let index = 0; index < indexes.length; index++) {
    ids.push(`card_id_${index}`);
  }
  const data:lsDataType = {
    order: [...indexes],
    open: Array(pairs).fill(false),
    id: [...ids],
    chosen:"none",
    theme
  };
  return data
}

function displayGame(data:lsDataType, gameZone:HTMLElement){
  for(let i=0; i<(data["order"].length); i++){
    gameZone.append(creatGameCard(data["order"][i], data["id"][i], data["open"][data["order"][i]-1]));
  }  
  changeTheme(data["theme"]);
  gameZone.dataset.chosen = data["chosen"]
}

function creatGameCard(index:number,id:string ,open:boolean = false):HTMLLIElement{
  const li = document.createElement('li') as HTMLLIElement;
  li.classList.add('game-zone__card', 'card');
  li.setAttribute('data-cardindex', String(index));
  li.setAttribute('data-open', String(open));
  li.setAttribute("id", id)
  return li;
}

function changeTheme(theme:lsDataType["theme"]='shrek'):void{
  for(let index=1; index<=10;index++){
    document.documentElement.style.setProperty(`--card-bgim-${index}`,`url('/${theme}/bgim-${index}.jpg')`)
  }
}

function clearGameZone():void{
  for(let item of [ ...getGameZone().children])item.remove();
}