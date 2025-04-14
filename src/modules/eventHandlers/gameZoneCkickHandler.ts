import { getGameZone, restoreGameZone, setGamezoneClickState } from "../gameField";
import { getProgressFromLocalStorage, setProgressToLocalStorage, setTimeToLocalStorage } from "../localStorage";
import { pauseTimer } from "../timer";
import { clearTimer } from "../timer/timer";

// type casting
export function gameZoneCkickHandler(event:MouseEvent){
        const target = event.target as HTMLElement
        const gameZone = getGameZone()
        let progress = getProgressFromLocalStorage();
        if(!target.classList.contains('game-zone__card')
           ||gameZone.dataset.clickDisabled === 'true'
           ||gameZone.dataset.timerDisabled === "true"
           || !progress
          )return;

        let amountOfOpen=0;
        for(const i of gameZone.children)if((i as HTMLElement).dataset.open==="true")amountOfOpen++;

        //выбираем первую карточку
        if(amountOfOpen%2==0){
          if(target.dataset.open==='true')return;
          target.dataset.open='true'
          gameZone.dataset.chosen = target.id;
        }
        //выбираем вторую карточку
        else{
          if(gameZone.dataset.chosen === target.id){
            target.dataset.open='false';
            return;
          }
          if(target.dataset.open === "true")return

          target.dataset.open='true'
          const chosen = document.getElementById(gameZone.dataset.chosen as string) as HTMLElement
          if(chosen.dataset.cardindex===target.dataset.cardindex){
            progress['open'][Number(target.dataset.cardindex)-1]=true;
            gameZone.dataset.chosen = "none"

            setProgressToLocalStorage(progress);
            if((amountOfOpen+1)===(gameZone.children.length)){
              setGamezoneClickState("true", gameZone)
              pauseTimer();
              setTimeToLocalStorage();
              setTimeout(()=>{
                if(confirm("Поздравляем, вы выиграли\n Хотите сыграть еще?")){
                  setProgressToLocalStorage();
                  restoreGameZone();//потому что clearZone отвечает исключительно за очистку, но не стили
                  clearTimer();
                  const rejimeModalBtn = (document.getElementById("header__interraction-list") as HTMLElement)
                                                  .querySelector("[data-action=\"show-rejime-modal\"]") as HTMLElement;
                  rejimeModalBtn.dispatchEvent((new Event('click',{'bubbles':true})));
                  setGamezoneClickState("false", gameZone)
                }
                },250)
            }
          }
          else{
            gameZone.dataset.clickDisabled = 'true';
            //чтобы игрок успел посмотреть карты
            setTimeout(()=>{
              console.log(chosen)
              chosen.dataset.open='false';
              target.dataset.open='false';
              // chosen = null;
              gameZone.dataset.chosen = "none"
              setGamezoneClickState("false", gameZone)
            },750)
          }
        }

}
