import { Game2048 } from "./2048";
import { ControllerKeysCode } from "./controller";

export class Game2048Grid extends Game2048{
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
            // this.attachElement();
            this.resetGridValues()
        })
    }
    createGrid(){
        const tableElement= document.createElement('div');
        tableElement.classList.add('grid-wrapper')
        this.grid.forEach((row,rowI)=>{
            row.forEach((col,colI)=>{
                const colElement=document.createElement('div');
                colElement.classList.add('tile')
                if(col){
                    colElement.innerText=col+'';
                    colElement.classList.add('active')
                }
                colElement.style.setProperty('--col',colI+'')
                colElement.style.setProperty('--row',rowI+'')
                tableElement.appendChild(colElement);
            });
        })
        return tableElement;
    }
    setDOMParent(element:HTMLElement){
        this.element=element;
    }
    resetGridValues(){
        const tableElement= this.element?.lastElementChild;
        if(!tableElement) return;
        const cells= tableElement.childNodes as unknown as HTMLElement[];
        this.grid.forEach((row,rowI)=>{
            row.forEach((col,colI)=>{
                const cellElement=cells[this.gridSize*rowI+colI];
                if(col && cellElement){
                    cellElement.innerText=col+'';
                    cellElement.classList.add('active')
                }else{
                    cellElement.innerText='';
                    cellElement.classList.remove('active')
                }
                cellElement.style.setProperty('--col',colI+'')
                cellElement.style.setProperty('--row',rowI+'')
            });
        })
        const header= this.element?.firstElementChild as HTMLElement;
        header.innerText= ' Score : '+ this.score;

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
        element.appendChild(this.createGrid());
    }   
}