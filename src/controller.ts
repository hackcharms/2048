export enum ControllerKeysCode{
    RIGHT='ArrowRight',
    LEFT='ArrowLeft',
    UP='ArrowUp',
    DOWN='ArrowDown',

}
export class Controller{
    private availableNumbers:Set<number>=new Set()
    gridWidth=0;
    gridHeight=0;
    static ROW_SELECTOR='x-data-row'
    static COL_SELECTOR='x-data-col'
    static VALUE_SELECTOR='x-data-value'
    constructor(public element:HTMLElement,private size=4){
        this.availableNumbers.add(2)
        const tile=element.firstElementChild
        if(tile){
            const rec=tile.getBoundingClientRect();
            this.gridHeight=rec.height;
            this.gridWidth=rec.width;
            element.style.setProperty('--height',this.gridHeight+'')
            element.style.setProperty('--width',this.gridWidth+'')
        }
        this.bindKeys()
    }
    static randomInteger(min=0,max=10){
        return (min+Math.random()*max)|0;
    }
    randomValue(){
        return Array.from(this.availableNumbers)[Controller.randomInteger(0,this.availableNumbers.size)]
    }

    emptyCells(){
        return this.element.querySelectorAll(`.tile:not([${Controller.VALUE_SELECTOR}])`);
    }
    filledCells(){
        return this.element.querySelectorAll(`.tile[${Controller.VALUE_SELECTOR}]`);
    }
    fillRandomTile(count:number=1){
        for(let i=0;i<count;i++){
            const emptyCells=this.emptyCells();
            emptyCells[Controller.randomInteger(0,emptyCells.length)].setAttribute(Controller.VALUE_SELECTOR,this.randomValue()?.toString())
        }
    }
    shiftTile(cellAxis:'row'|'col',index:number,direction:'positive'|'negative'){
        const selector= cellAxis==='row'?Controller.ROW_SELECTOR:Controller.COL_SELECTOR
        const pAxis=cellAxis==='row'?'col':'row';
        if(!cellAxis||typeof index!=='number'||!direction) throw Error('Axis, index and Direction is important to shift cells')
        const colsWithData=this.element.querySelectorAll<HTMLElement>(`.tile[${selector}="${index}"][x-data-value]`)
        const colsWithoutData=this.element.querySelectorAll<HTMLElement>(`.tile[${selector}="${index}"]:not([x-data-value])`)
        let startIndex=direction==='negative'?0:this.size-1;
        colsWithData.forEach(col=>{
            col.setAttribute(`x-data-${pAxis}`,startIndex+'')
            col.style.setProperty(`--${pAxis}`,startIndex+'')
            startIndex+=direction==='negative'?1:-1;
            console.log('startIndex',startIndex)
        })
        colsWithoutData.forEach(col=>{
            console.log('startIndex',startIndex)
            col.setAttribute(`x-data-${pAxis}`,startIndex+'')
            col.style.setProperty(`--${pAxis}`,startIndex+'')
            startIndex+=direction==='negative'?1:-1
        })
    }
    shiftRows(row:number,direction:'left'|'right'){
        if(typeof row!=='number'||!direction) throw Error('Row and Direction is importatnt to shift cols')
        const colsWithData=this.element.querySelectorAll<HTMLElement>(`.tile[${Controller.ROW_SELECTOR}="${row}"][x-data-value]`)
        const colsWithoutData=this.element.querySelectorAll<HTMLElement>(`.tile[${Controller.ROW_SELECTOR}="${row}"]:not([x-data-value])`)
        let startIndex=direction==='left'?0:this.size-1;
        colsWithData.forEach(col=>{
            col.setAttribute('x-data-col',startIndex+'')
            col.style.setProperty('--col',startIndex+'')
            startIndex+=direction==='left'?1:-1;
            console.log('startIndex',startIndex)
        })
        colsWithoutData.forEach(col=>{
            console.log('startIndex',startIndex)
            col.setAttribute('x-data-col',startIndex+'')
            col.style.setProperty('--col',startIndex+'')
            startIndex+=direction==='left'?1:-1
        })
    }
    shiftCols(col:number,direction:'up'|'down'){
        if(typeof col!=='number'||!direction) throw Error('Row and Direction is importatnt to shift cols')
        const rowsWithData=this.element.querySelectorAll<HTMLElement>(`.tile[${Controller.COL_SELECTOR}="${col}"][x-data-value]`)
        const rowsWithoutData=this.element.querySelectorAll<HTMLElement>(`.tile[${Controller.COL_SELECTOR}="${col}"]:not([x-data-value])`)
        let startIndex=direction==='up'?0:this.size-1;
        rowsWithData.forEach(row=>{
            row.setAttribute('x-data-row',startIndex+'')
            row.style.setProperty('--row',startIndex+'')
            startIndex+=direction==='up'?1:-1
        })
        rowsWithoutData.forEach(row=>{
            row.setAttribute('x-data-row',startIndex+'')
            row.style.setProperty('--row',startIndex+'')
            startIndex+=direction==='up'?1:-1
        })
    }
    left(){
        this.filledCells().forEach((tile) => {
          const row = tile.getAttribute(Controller.ROW_SELECTOR);
          this.shiftRows(parseInt(row!), "left");
          const availableRowCells =
            this.element.querySelectorAll<HTMLDivElement>(
              `.tile[${Controller.ROW_SELECTOR}="${row}"][${Controller.VALUE_SELECTOR}]`
            );
          let lastValue = availableRowCells[
            availableRowCells.length - 1
          ].getAttribute(Controller.VALUE_SELECTOR);
          let pCell = availableRowCells[availableRowCells.length - 1];
          let availableIndex = availableRowCells.length - 2;
          for (; availableIndex >= 0; availableIndex--) {
            const cell = availableRowCells[availableIndex];
            const value = cell.getAttribute(Controller.VALUE_SELECTOR);
            if (value && value === lastValue) {
              cell.setAttribute(
                Controller.VALUE_SELECTOR,
                (+value * 2).toString()
              );
              this.availableNumbers.add(+value * 2);
              pCell.removeAttribute(Controller.VALUE_SELECTOR);
            }
            lastValue = value;
            pCell = cell;
          }
        });
        this.fillRandomTile()
    }
    right(){
        this.filledCells().forEach((tile) => {
          const row = tile.getAttribute(Controller.ROW_SELECTOR);
          this.shiftRows(parseInt(row!), "right");
          const availableRowCells = this.element.querySelectorAll(
            `.tile[${Controller.ROW_SELECTOR}="${row}"][${Controller.VALUE_SELECTOR}]`
          );
          let lastValue = availableRowCells[0].getAttribute(
            Controller.VALUE_SELECTOR
          );
          let pCell = availableRowCells[0];
          let availableIndex = 1;
          for (
            ;
            availableIndex <= availableRowCells.length - 1;
            availableIndex++
          ) {
            const cell = availableRowCells[availableIndex];
            const value = cell.getAttribute(Controller.VALUE_SELECTOR);
            if (value && value === lastValue) {
              cell.setAttribute(
                Controller.VALUE_SELECTOR,
                (+value * 2).toString()
              );
              pCell.removeAttribute(Controller.VALUE_SELECTOR);
              this.availableNumbers.add(+value * 2);
              // availableIndex++;
            }
            lastValue = value;
            pCell = cell;
          }
        });
        this.fillRandomTile()
    }
    up(){
        console.log('Up pressed')
    }
    down(){
        console.log('down pressed')
    }
    checkGameOver(){
        if(this.emptyCells().length===0){
            window.alert('☠️ game over')
        }
    }

    bindKeys(){
        window.addEventListener('keyup',(event:KeyboardEvent)=>{
            console.log('keyup',event)
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
            this.checkGameOver()
        })
    }
}