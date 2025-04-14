import { isPermitedKey } from "../api";
import { createGameZone, getGameZone, setGamezoneClickState } from "../gameField";
import { initializeTimer } from "../timer";

export function modalFormSubmitHandler(event:SubmitEvent){
  event.preventDefault();

  const gameZone = getGameZone();
  const target = event.target;

  if(!(target instanceof HTMLFormElement) || !target) return

  switch(target.getAttribute('name')){
    case 'rejime-form':
      const [cardAmount, theme] = extractRejimeForm(target)
      
      const cardAmountValue = Number(cardAmount)
      if(!isPermitedKey(theme) || !Number.isInteger(cardAmountValue))return

      createGameZone(cardAmountValue,theme);
      setGamezoneClickState("false", gameZone);
      clearRejimeForm(target)
      break;
    case 'timer-form':
      const [minutes, seconds] = extractTimerForm(target)
      if(!Number.isInteger(seconds)||!Number.isInteger(minutes))return

      initializeTimer(seconds, minutes);
      clearTimerForm(target)
      break;
    //Добавить таймер
  }
  closeForm(target)
}

//======================page crowler====================
function extractRejimeForm(form: HTMLFormElement):[string, string]{
  const cardAmount = (form.elements.namedItem('card-amount') as HTMLInputElement|RadioNodeList).value
  const theme = (form.elements.namedItem('card-theme') as HTMLInputElement|RadioNodeList).value
 return [cardAmount, theme]
}

function extractTimerForm(form: HTMLFormElement){
  const minutes =  Number((form.elements.namedItem('minutes-amount') as HTMLInputElement|RadioNodeList ).value)
  const seconds = Number((form.elements.namedItem('seconds-amount') as HTMLInputElement|RadioNodeList).value)
  return [minutes, seconds] 
}

function clearRejimeForm(form: HTMLFormElement):void{
  (form.elements.namedItem('card-amount') as HTMLInputElement|RadioNodeList).value = '';
}

function clearTimerForm(form: HTMLFormElement):void{
  for(const name of ['minutes-amount', 'seconds-amount']){
    (form.elements.namedItem(name) as HTMLInputElement|RadioNodeList).value = '';
  }
}

function closeForm(form: HTMLFormElement){
  (form.closest('.header__modal') as HTMLElement).classList.remove('dynamic-flex')
}