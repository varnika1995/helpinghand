

const foo = (data) => {
    return new Promise((resolve, reject) => {
        if (data === 0) {
            resolve("correct");
        }
        reject("not correct");
    });
}

foo(6).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});
