/*dependencies*/
import { getGameZone } from "../gameField";
import { setGamezoneTimerState } from "../gameField/gameField";
import { getTimeFromLocalStorage, setTimeToLocalStorage } from "../localStorage"
/*dependencies*/

import { changeShowTimerTextContext, changeTimerBtnRejime, getShowTimer, timeToMinSec } from "./utils";

export {
  initializeTimer,
  runTimer,
  pauseTimer,
  restoreTimer,
  clearTimer
}

function initializeTimer(seconds:number, minutes:number):void {
  setTimeToLocalStorage({
    time:(seconds+minutes*60)*1000,
    timerId:null
  });

  changeShowTimerTextContext(minutes, seconds, getShowTimer())
}

function runTimer():void{
  const timeData = getTimeFromLocalStorage();
  if(!timeData)return;

  const gameZone = getGameZone()
  setGamezoneTimerState("false", getGameZone())

  const showTimer = getShowTimer()
  let [minutes, seconds] = timeToMinSec(timeData['time'])

  changeTimerBtnRejime('pause');
  const timerId = setInterval(() => {
    timeData['timerId']=timerId;
    timeData['time']-=1000;
    setTimeToLocalStorage(timeData);

    seconds-=1;
    if(timeData["time"]>0){
      if(seconds<=0 && minutes>=1){
        minutes-=1;
        seconds = 59;
      }
      changeShowTimerTextContext(minutes, seconds, showTimer)
    }
    else {
      setGamezoneTimerState("true", gameZone)
      clearTimer();
      changeTimerBtnRejime('continue');
      clearInterval(timerId);
      alert('Время истекло');
    }
  }, 1000);
}

function pauseTimer():void{
  const timeData = getTimeFromLocalStorage();
  if(!timeData || !timeData["timerId"])return

  setGamezoneTimerState("true", getGameZone())
  clearInterval(timeData["timerId"]);
  changeTimerBtnRejime('continue');
}

function restoreTimer():void{
  const time = getTimeFromLocalStorage()?.time;
  if(!time)return

  const [minutes, seconds] = timeToMinSec(time)
  changeShowTimerTextContext(minutes, seconds, getShowTimer())
}

function clearTimer():void{
  changeShowTimerTextContext(0, 0, getShowTimer())
  setTimeToLocalStorage();
}