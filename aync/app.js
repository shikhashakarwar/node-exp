console.log("your async code is runnig on the way");


for (let i = 0; i < 10; i++) {
    setTimeout(()=> {
        console.log(i);
    }, 100);
}