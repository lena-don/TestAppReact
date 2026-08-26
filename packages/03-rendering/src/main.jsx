import { createRoot } from 'react-dom/client'
import './index.css'

const elem = createRoot(document.getElementById("id1"));
 
function tick() {
    elem.render(
        <div>
            <h3>Текущее время {new Date().toLocaleTimeString()}</h3>
            <p>Для текущего времени задан таймер обновления,
              и каждый установленный промежуток времени Реакт
              будет получать от системы нашего компа новые данные
              о текущем времени</p>
        </div>
    );
}
setInterval(tick, 1000); // Здесь мы задаём, что функция tick
// будет вызываться каждую секунду — то есть каждую секунду
// будет рендерится отображение текущего времени
    
createRoot(document.getElementById("id2"))
    .render(
        <div>
            <h3>Начальное время {new Date().toLocaleTimeString()}</h3>
            <p>Здесь значение времени будет статично — Реакт
              отрисовывает это время один раз в момент обновления
              страницы и больше со значениями внутри ничего не делает</p>
        </div>
    );