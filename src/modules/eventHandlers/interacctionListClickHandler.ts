import { pauseTimer, runTimer } from "../timer";

export function interacctionListClickHandler(event:MouseEvent){
  const target = event.target as HTMLElement
  const modal =  target.closest('.header__item')?.querySelector('.header__modal') as HTMLElement
  switch(target.dataset.action){
    case 'show-rejime-modal':
      modal.classList.add('dynamic-flex')
      break;
    case 'show-timer-modal':
      modal.classList.add('dynamic-flex')
      break;
    case 'cancel-form':
      target.closest('.header__modal')?.classList.remove('dynamic-flex');
      break;
    case 'control-timer':
      switch(target.dataset.state){
        case 'continue':
          runTimer();
          break;
        case 'pause':
          pauseTimer();
          break;
      }
      break;
  }
}
