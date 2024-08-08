export default {
    wrapper: window.document.createElement('div'),
     slides(value:number){
        const strValue=value.toString();
        this.wrapper.style.setProperty('--grid-size',strValue);
        this.wrapper.classList.add('grid-wrapper');
        Array(value*value).fill(0).map((_el,index:number)=>{
            const tile= document.createElement('div');
            tile.classList.add('tile')
            tile.setAttribute('x-data-col',(index%value).toString())
            tile.setAttribute('x-data-row',((index/value)|0).toString())
            this.wrapper.append(tile);
        });
        return this;
     },
    render(element:HTMLElement){
        element.append(this.wrapper)
        return this;
    }
}