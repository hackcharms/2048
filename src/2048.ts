export enum ControllerKeysCode{
    RIGHT='ArrowRight',
    LEFT='ArrowLeft',
    UP='ArrowUp',
    DOWN='ArrowDown',

}
export class Game2048{
    grid:number[][];
    private _score=0;
    private availableNumbers:Set<number>=new Set()
    element:HTMLElement|null=null;
    constructor(protected gridSize=4){
        this.grid = Array(gridSize).fill(0).map(()=>Array(gridSize).fill(0));
        this.availableNumbers.add(2)
        this.fillRandomTile(2)
        this.print();
    }

    static randomInteger(min=0,max=10){
        return (min+Math.random()*max)|0;
    }
    get score(){
        return this._score;
    }
    randomValue(){
        return Array.from(this.availableNumbers)[Game2048.randomInteger(0,this.availableNumbers.size)]
    }
    emptyCells(){
        const cells=new Set<[x:number,y:number]>();
        this.grid.forEach((row,rowI)=>{
            row.forEach((col,colI)=>{
                if(!col){
                    cells.add([rowI,colI])
                }
            })
        });
        return Array.from(cells);
    }
    fillRandomTile(count=1){
        for(let i=0;i<count;i++){
            const emptyCells=this.emptyCells();
            if(!emptyCells.length) return this.gameOver();
            const [row,col]=emptyCells[Game2048.randomInteger(0,emptyCells.length)];
            this.grid[row][col]=this.randomValue()
            this.print();
        }
        return this;
    }
    print(table=this.grid){
        console.table(table)
    }
    gameOver(){
        window.alert('Game Over dude')
    }
    private shiftArray(arr:number[],direction:'positive'|'negative'){
        const dirVal=direction==='negative'?1:-1;
        let position=direction==='negative'?0:arr.length-1;
        let previousValue=0;
        while(position<arr.length&&position>=0){
            let ptr= position+dirVal
            while(ptr<arr.length&&ptr>=0){
                if(!arr[position]&&arr[ptr]){
                    [arr[position],arr[ptr]]=[arr[ptr],arr[position]];
                    break
                }
                ptr+=dirVal;
            }
            if(previousValue && arr[position]===previousValue){
                arr[position-dirVal]=arr[position]*2;
                this._score+=arr[position]*2;
                arr[position]=0;
                previousValue=0;
            }else{
                previousValue=arr[position]
                position+=dirVal;
            }
        }
        return arr;
    }
    private shift2DArray(arr:number[][],direction:'positive'|'negative',col=0){
        // performing operation from opposite side 
        const dirVal=direction==='negative'?1:-1;
        const len=arr.length;
        let position=direction==='negative'?0:len-1;
        let previousValue=0;
        while(position<len&&position>=0){
            let ptr= position+dirVal
            while(ptr<len&&ptr>=0){
                if(!arr[position][col]&&arr[ptr][col]){
                    [arr[position][col],arr[ptr][col]]=[arr[ptr][col],arr[position][col]];
                    break
                }
                ptr+=dirVal;
            }
            if(previousValue && arr[position][col]===previousValue){
                arr[position-dirVal][col]=arr[position][col]*2;
                this._score+=arr[position][col]*2;
                arr[position][col]=0;
                previousValue=0;
            }else{
                previousValue=arr[position][col]
                position+=dirVal;
            }
        }
        return arr
    }
    right(){
        this.grid.forEach((row)=>{
            this.shiftArray(row,'positive')
        })
        this.print()
    }
    left(){
        this.grid.forEach((row)=>{
            this.shiftArray(row,'negative')
        })
        this.print()

    }
    up(){
        this.grid.forEach((_,col)=>{
            this.shift2DArray(this.grid,'negative',col)
        })
        this.print()

    }
    down(){
        this.grid.forEach((_,col)=>{
            this.shift2DArray(this.grid,'positive',col)
        })
        this.print();
    }
}