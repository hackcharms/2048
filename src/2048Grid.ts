import { Game2048 } from "./2048";
import { ControllerKeysCode } from "./controller";

export class Game2048Grid extends Game2048{
    spacing:number=0;
    cellSize:number=148;
    constructor(gridSize?:number){
        super(gridSize);
        this.cellSize=600/ this.gridSize + this.spacing;
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
        // const tableElement= document.createElement('div');
        // tableElement.classList.add('grid-wrapper')
        // tableElement.setAttribute('id','grid-wrapper')
        // this.grid.forEach((row)=>{
        //     row.forEach(()=>{
        //         const colElement=document.createElement('div');
        //         colElement.classList.add('tile')
        //         tableElement.appendChild(colElement);
        //     });
        // })
        // return tableElement;
    }
    setDOMParent(element:HTMLElement){
        this.element=element;
    }
    resetGridValues(tableElement= this.element){
        if(!this.element){
            this.element=tableElement;
        }
        if(!tableElement) return;
        console.log(tableElement)
        const cells= tableElement.getElementsByClassName('tile') as unknown as  HTMLElement[];
        console.log('cells',cells)
        if(!cells.length) return;
        this.grid.forEach((row,rowI)=>{
            row.forEach((col,colI)=>{
                const cellElement=cells[this.gridSize*rowI+colI];
                console.log(col , cellElement)
                if(col && cellElement){
                    cellElement.setAttribute('x-data-value',col+'');
                    // cellElement.innerText=col+'';
                    // cellElement.classList.remove('hidden')
                }
                // else{
                //     // cellElement.innerText='';
                //     // cellElement.classList.remove('active-tile')
                // }
                cellElement.style.setProperty('--col',colI+'')
                cellElement.style.setProperty('--row',rowI+'')
            });
        })
        // const header= this.element?.firstElementChild as HTMLElement;
        // header.innerText= ' Score : '+ this.score;

    }
    // attachElement(element=this.element){
    //     if(!element) return console.warn('please set the element')
    //     if(!this.element) this.element=element;
    //     if(element.firstElementChild){
    //         element.removeChild(element.firstElementChild);
    //         element.removeChild(element.firstElementChild);
    //     }
    //     const scoreElement= document.createElement('h4');
    //     scoreElement.innerText= ' Score : '+ this.score;
    //     element.appendChild(scoreElement)
    //     element.appendChild(this.createGrid());
    // }   
}