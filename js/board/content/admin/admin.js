import { Init } from './controller.js'

const renderFinishDiv = document.getElementById('render-finish');
const renderBool = new Boolean(renderFinishDiv.dataset.render);

renderFinishDiv.addEventListener('click', ()=>{
    Init.bindEvent();
});

if( renderBool ) {
    Init.bindEvent();
}

