document.querySelector('.login').addEventListener('click',()=>{

    const failed =  document.querySelector('.failed');
    failed.innerHTML = '';
    const userNameInp = document.querySelector('#username');
    const passwordInp = document.querySelector('#password');

    const userName = userNameInp.value.toLowerCase();
    const password = passwordInp.value.toLowerCase();

    const myUserName = 'admin';
    const myPassword = 'admin123';


    if(userName === myUserName && password === myPassword){

        window.location.href = "./home.html"
    }
    else{
       failed.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Login Failed. Try again';
    }
})