export function formatTime(seconds: number, minutes: number): string {
    const formatSegment = (value: number): string => 
      value.toString().padStart(2, '0');
  
    return `${formatSegment(minutes)}:${formatSegment(seconds)}`;
}
  
export function timeToMinSec(time:number):[number, number]{
    let minutes = (time - time%(60*1000))/(60*1000);
    let seconds = (time%(60*1000))/1000;
    return [minutes, seconds]
}
  
export function changeTimerBtnRejime(rejime:"pause"|"continue"){
    ((document
            .getElementById('header__interraction-list') as HTMLElement)
            .querySelector("[data-action=\"control-timer\"]") as HTMLElement)
            .dataset.state=rejime
}
  
export function getShowTimer():HTMLElement{
    return (document
                   .getElementById('header__interraction-list') as HTMLElement)
                   .querySelector('[data-action=\"show-time\"]') as HTMLElement
}
  
export function changeShowTimerTextContext(minutes:number, seconds:number,showTimer: HTMLElement):void{
    showTimer.textContent="";
    showTimer.textContent=formatTime(seconds, minutes)
}