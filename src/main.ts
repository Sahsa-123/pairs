import { restoreGameZone } from "./modules/gameField"
import { restoreTimer } from "./modules/timer"
import { gameZoneCkickHandler, modalFormSubmitHandler,interacctionListClickHandler } from "./modules/eventHandlers";

function createApp(){
  /*Восстановление партии*/
  restoreGameZone();
  restoreTimer();
  /*Восстановление партии*/

  /*Добавление ивент хэндлеров*/
  const headerInterractionList = document.getElementById('header__interraction-list') as HTMLElement;
  const forms = headerInterractionList.querySelectorAll<HTMLElement>('.modal__form');
  const gameZone = document.getElementById('game-zone') as HTMLElement;

  for(let form of forms) form.addEventListener('submit', modalFormSubmitHandler);
  headerInterractionList.addEventListener('click',interacctionListClickHandler);
  gameZone.addEventListener('click', gameZoneCkickHandler);
  /*Добавление ивент хэндлеров*/
}

document.addEventListener('DOMContentLoaded', createApp);

