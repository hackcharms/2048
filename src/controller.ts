export class Controller{
    private availableNumbers:Set<number>=new Set()
    static ROW_SELECTOR='x-data-row'
    static COL_SELECTOR='x-data-col'
    static VALUE_SELECTOR='x-data-value'
    constructor(public element:HTMLElement,private size=4){
        this.availableNumbers.add(2)
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
    left(){
        this.filledCells().forEach((tile,index)=>{
            const row= tile.getAttribute(Controller.ROW_SELECTOR);
            const availableRowCells=this.element.querySelectorAll(`.tile[${Controller.ROW_SELECTOR}="${row}"][${Controller.VALUE_SELECTOR}]`);
            let lastValue=availableRowCells[availableRowCells.length-1].getAttribute(Controller.VALUE_SELECTOR);
            let pCell=availableRowCells[availableRowCells.length-1] 
            let availableIndex = availableRowCells.length-2;
            for(;availableIndex>=0;availableIndex--){
                const cell=availableRowCells[availableIndex]
                const value= cell.getAttribute(Controller.VALUE_SELECTOR);
                if(value && value===lastValue){
                    console.log('merge and shift col to right',cell,pCell)
                    cell.setAttribute(Controller.VALUE_SELECTOR,(+value*2).toString())
                    this.availableNumbers.add(+value*2)
                    pCell.removeAttribute(Controller.VALUE_SELECTOR)
                }
                lastValue=value;
                pCell=cell;
            }
            
        })
    }
    right(){
        this.filledCells().forEach((tile,index)=>{
            const row= tile.getAttribute(Controller.ROW_SELECTOR);
            const availableRowCells=this.element.querySelectorAll(`.tile[${Controller.ROW_SELECTOR}="${row}"][${Controller.VALUE_SELECTOR}]`);
            let lastValue=availableRowCells[0].getAttribute(Controller.VALUE_SELECTOR);
            let pCell=availableRowCells[0]
            let availableIndex = 1;
            for(;availableIndex<=availableRowCells.length-1;availableIndex++){
                const cell=availableRowCells[availableIndex]
                console.log('cell,availableRowCells',cell,availableRowCells,availableIndex)
                const value= cell.getAttribute(Controller.VALUE_SELECTOR);
                if(value && value===lastValue){
                    console.log('merge and shift col to left',value,lastValue,cell,pCell)
                    cell.setAttribute(Controller.VALUE_SELECTOR,(+value*2).toString())
                    pCell.removeAttribute(Controller.VALUE_SELECTOR)
                    this.availableNumbers.add(+value*2)
                    // availableIndex++;
                }
                lastValue=value;
                pCell=cell;
            }
            
        })
    }
}