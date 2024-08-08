export async function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  function promiseTest(){
    return new Promise((resolve,reject)=>{
      window.setTimeout(()=>{
        return resolve('hello there');
      },5_000);
    })
  }

  console.log( promiseTest());

  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function bindInputChange(element: HTMLButtonElement) {
  function handleInput(event:Event){
    console.log("event", event);
}
(element as HTMLInputElement).addEventListener('input',handleInput)
}
