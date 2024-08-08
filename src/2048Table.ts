import { Game2048 } from "./2048";
import { ControllerKeysCode } from "./controller";

export class Game2048Table extends Game2048{
    constructor(gridSize?:number){
        super(gridSize);
    }
    attachEventListener(){
        document.addEventListener('keyup',(event:KeyboardEvent)=>{
             if(event.key===ControllerKeysCode.LEFT){
                this.left();
            }
            if(event.key===ControllerKeysCode.RIGHT){
                this.right();
            }
            if(event.key===ControllerKeysCode.UP){
                this.up();
            }
            if(event.key===ControllerKeysCode.DOWN){
                this.down();
            }
            this.fillRandomTile();
            this.attachElement();
        })
    }
    createTable(){
        const tableElement= document.createElement('table');
        tableElement.classList.add('grid-table')
        this.grid.forEach((row)=>{
            const rowElement= document.createElement('tr');
            row.forEach((col)=>{
                const colElement=document.createElement('td');
                colElement.classList.add('cell')
                if(col){
                    colElement.innerText=col+'';
                    colElement.classList.add('active')
                }
                rowElement.appendChild(colElement);
            });
            tableElement.appendChild(rowElement);
        })
        return tableElement;
    }
    setDOMParent(element:HTMLElement){
        this.element=element;
    }
    attachElement(element=this.element){
        if(!element) return console.warn('please set the element')
        if(!this.element) this.element=element;
        if(element.firstElementChild){
            element.removeChild(element.firstElementChild);
            element.removeChild(element.firstElementChild);
        }
        const scoreElement= document.createElement('h4');
        scoreElement.innerText= ' Score : '+ this.score;
        element.appendChild(scoreElement)
        element.appendChild(this.createTable());
    }
    
}