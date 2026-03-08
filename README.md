 
    - 1️⃣ What is the difference between var, let, and const?
    ans: - var: (1) creates global scope , (2) value is re-assignable (3) re-declarable with same name 
         - const:(1) creates block scope (different from var) , (2) value is not re-assignable (diff from both let and var) 
                 (3)  not re-declarable with same name (different from var)
         - let:  (1) creates block scope (different from var) , (2) value is re-assignable (diff from const) 
                 (3) not re-declarable with same name (different from var)
    - 2️⃣ What is the spread operator (...)?
       ans: It is like loop. It spreads the items. Like, we can get array properties separately by it, we can geevery word from a string by it etc. 
       For example: let a = [1, 2 , 3]; let b = [a] // means b = [[1,2,3]];
       but b = [...a] //  means b = [1,2,3] 


    - 3️⃣ What is the difference between map(), filter(), and forEach()?

    (1)map(): it performs the given condition and returns a new array.
    for example: [1,2,3].map(e =>e*2) // it will return a new array which is [2,4,6]. but for multiline code we have to write return.

    (2)filter(): it matches condition. if the ondition is correct, it will keep, else it will not take it.
    for example: [1,2,3,4].filter(e =>e%2 === 0) // it will return a new array which is [2,4].

    (3)forEach(): it almost acts like for of loop. I gives us each value of an array separately but not an array.
    for example: [1,2,3,4].forEach(e => {console.log(e)}) // it will give us 1 2 3 4.

    - 4️⃣ What is an arrow function?
    ans: it is a shortcut of function where we 
         - dont need to write key word function.
         - dont need to write () if there is single parameter.
         - dont need to write {} and return for single line code.

         for example: [1,2,3].map(e =>e*2) // here function (e){return e*2} is the the full form
    - 5️⃣ What are template literals?
    ans:it is a way to create string but it has some benefits -
      (1) can take values of variables by ${}.
      (2) can write multi line codes without \n
      (3) can do operation inside a string by ${};

