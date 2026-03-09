        // Resuable functions

const attachmentColor = (label , buttonClasses) => {

            if(label === 'bug'){ buttonClasses.push('border-red-500' , 'bg-red-100' , 'text-red-500') }
            else if(label === 'enhancement' ){buttonClasses.push('border-green-500' , 'bg-green-100' , 'text-green-500')}
            else if(label === 'help wanted'){buttonClasses.push('border-yellow-700' , 'bg-yellow-100' , 'text-yellow-700')}
            else if(label === 'documentation'){buttonClasses.push('border-blue-500' , 'bg-blue-100' , 'text-blue-500')}
            else if(label === 'good first issue'){buttonClasses.push('border-pink-500' , 'bg-pink-100' , 'text-pink-500')};
};
const priorityBtnColor = (d,priorityColor) => {
            if(d.priority === 'high'){ priorityColor.push('border-red-600','bg-red-100', 'text-red-600 ') }
        else if(d.priority === 'medium') { priorityColor.push('border-yellow-600','bg-yellow-100', 'text-yellow-600 ')  }
        else{ priorityColor.push('border-gray-800','bg-gray-300', 'text-gray-800 ')  }
};
const myColorUpdate = (d) => {
            let myColor = '';
            if(d.status === 'open'){
              myColor = 'bg-[#00a96eFF]'
            }
            else{
              myColor = 'bg-[#7C3AEDFF]'
            };

            return myColor;
}


// Loading UI

const showLoading = () => {
    const loadingSpinner =document.querySelector('#loadSpinner');
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    document.querySelector('#issue-container').classList.add('hidden')
};
const endLoading = () => {
    const loadingSpinner =document.querySelector('#loadSpinner');
    loadingSpinner.classList.add('hidden');
    loadingSpinner.classList.remove('flex');
    document.querySelector('#issue-container').classList.remove('hidden')
};

// toggle 
const buttonToggling = (id) => {

    const allBtn =document.querySelector('#all-btn');
    const openBtn = document.querySelector('#open-btn');
    const closedBtn = document.querySelector('#closed-btn');

    allBtn.classList.remove('bg-[#4a00ffFF]' , 'text-white');
    openBtn.classList.remove('bg-[#4a00ffFF]' , 'text-white');
    closedBtn.classList.remove('bg-[#4a00ffFF]' , 'text-white');
    allBtn.classList.add('bg-transparent' , 'text-black');
    openBtn.classList.add('bg-transparent' , 'text-black');
    closedBtn.classList.add('bg-transparent' , 'text-black');


    const changeBtn = document.querySelector(`#${id}`);

    changeBtn.classList.remove('bg-transparent' , 'text-black');
    changeBtn.classList.add('bg-[#4a00ffFF]' , 'text-white')



}

// Data Loads
 const loadAllIssues = async () => {
    showLoading();
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    
    displayAllIssues(data.data);
    buttonToggling('all-btn');
    endLoading();

 };
 const loadSelectiveIssues = async (currentStatus) => {
    showLoading();
     let open = [];
     let closed = [];
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
   
    data.data.forEach(item => {
        
        if(item.status === 'open'){
           
            open.push(item);
            
            
        }
        else{
            closed.push(item)
        };
        
    });
    const issueCount = document.querySelector('#issue-count');
    if(currentStatus === 'open'){
        displayOpen(open);
        issueCount.innerText = open.length;
        buttonToggling('open-btn');

    }
    else{
        displayClosed(closed);
        issueCount.innerText = closed.length;
        buttonToggling('closed-btn');
    };
    endLoading();
    
 };
const loadsearchIssues = async (searchText) => {
    showLoading();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllIssues(data.data);
    endLoading();
};

const soloIssues = async (id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);

    const data = await res.json();

    
    
    displayModal(data.data);
    document.querySelector('#my_modal_5').showModal();

};

// displaying Data 

 const displayAllIssues = (data) => {
    const issueCount = document.querySelector('#issue-count');
    
    issueCount.innerText = data.length;
    const openImage = '<img class="w-full h-full" src="./assets/Open-Status.png" alt="" ></img>';
    const closedImage = '<img class="w-full h-full" src="./assets/Closed- Status .png" alt="">';
    
    const issueContainer = document.querySelector('#issue-container');
    
    issueContainer.innerHTML = '';

    data.forEach(d => {
        
        let brColor = '';

        if(d.status === 'open'){
            brColor = 'border-t-green-500';
        }
        else{
            brColor = 'border-t-purple-500';
        };

        let priorityColor = [];
        priorityBtnColor(d,priorityColor);


        const dateCreated = d.createdAt.slice(0, 10);
        const dateUpdated = d.updatedAt.slice(0, 10);
        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            attachmentColor(label , buttonClasses);

            return `<button class="border ${buttonClasses.join(' ')}   rounded-2xl px-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ');


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-full md:space-y-5 space-y-8 shadow-2xl border border-gray-50 border-t-6 ${brColor}" onclick="soloIssues(${d.id})">
                <div class="md:space-y-3 space-y-5 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            ${d.status === 'open' ? openImage : closedImage}
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="md:space-y-3 space-y-5 h-[107px]">
                        <h3 class="text-sm font-semibold h-[34px]">${d.title}</h3>
                        <p class="text-[12px] font-[400px] text-[#64748bFF] line-clamp-2">
                            ${d.description}
                        </p>
                        <div class="space-x-1 h-6">
                            ${buttons}
                        </div>
                    </div>
                </div>
                <hr class="w-full my-3 border border-gray-400">
                <div class="p-4 space-y-2 flex justify-between items-center">
                    <div>
                     <p class="text-[#64748bFF] text-[12px] font-[400px]">
                        ${d.author ? d.author.replace('_'," ").toUpperCase():'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] text-[12px] font-[400px]">
                        ${dateCreated}
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] text-[12px] font-[400px]">
                        ${d.assignee ? d.assignee.replace('_'," ").toUpperCase() : 'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] text-[12px] font-[400px]">
                        ${dateUpdated}
                    </p>
                    </div>
                </div>
            </div>


        `;

        
    });


};


const displayOpen = (data) => {
        
       const closedImage = '<img class="w-full h-full" src="./assets/Closed- Status .png" alt="">';
    
    const issueContainer = document.querySelector('#issue-container');
    
    issueContainer.innerHTML = '';

    data.forEach(d => {


        const dateCreated = d.createdAt.slice(0, 10);
        const dateUpdated = d.updatedAt.slice(0, 10);

        let priorityColor = [];

        priorityBtnColor(d,priorityColor);

        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            attachmentColor(label , buttonClasses);

            return `<button class="border ${buttonClasses.join(' ')} rounded-2xl px-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ')


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-full md:space-y-5 space-y-8 shadow-2xl border border-gray-50 border-t-6 border-t-green-500" onclick="soloIssues(${d.id})">
                <div class="md:space-y-3 space-y-5 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            <img class="w-full h-full" src="./assets/Open-Status.png" alt="" >
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="md:space-y-3 space-y-5 h-[107px]">
                        <h3 class="text-sm font-semibold h-[34px]">${d.title}</h3>
                        <p class="text-[12px] font-[400px] text-[#64748bFF] line-clamp-2">
                            ${d.description}
                        </p>
                        <div class="space-x-1 h-6">
                            ${buttons}
                        </div>
                    </div>
                </div>
                <hr class="w-full my-3 border border-gray-400">
                <div class="p-4 space-y-2 flex justify-between items-center">
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.author ? d.author.replace('_'," ").toUpperCase():'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        ${dateCreated}
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.assignee ? d.assignee.replace('_'," ").toUpperCase() : 'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        ${dateUpdated}
                    </p>
                    </div>
                </div>
            </div>


        `;

        
    });



};
const displayClosed = (data) => {

    
    
    const issueContainer = document.querySelector('#issue-container');
    
    issueContainer.innerHTML = '';

    data.forEach(d => {
        
        const dateCreated = d.createdAt.slice(0, 10);
        const dateUpdated = d.updatedAt.slice(0, 10);

        let priorityColor = [];

        priorityBtnColor(d,priorityColor);

        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            attachmentColor(label , buttonClasses);

            return `<button class="border ${buttonClasses.join(' ')} rounded-2xl px-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ')


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-full md:space-y-5 space-y-8 shadow-2xl border border-gray-50 border-t-6 border-t-purple-500" onclick="soloIssues(${d.id})">
                <div class="md:space-y-3 space-y-5 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            <img class="w-full h-full" src="./assets/Closed- Status .png" alt="">
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="md:space-y-3 space-y-5 h-[107px]">
                        <h3 class="text-sm font-semibold h-[34px]">${d.title}</h3>
                        <p class="text-[12px] font-[400px] text-[#64748bFF] line-clamp-2">
                            ${d.description}
                        </p>
                        <div class="space-x-1 h-6">
                            ${buttons}
                        </div>
                    </div>
                </div>
                <hr class="w-full my-3 border border-gray-400">
                <div class="p-4 space-y-2 flex justify-between items-center">
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.author ? d.author.replace('_'," ").toUpperCase():'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        ${dateCreated}
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.assignee ? d.assignee.replace('_'," ").toUpperCase() : 'NO NAME'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        ${dateUpdated}
                    </p>
                    </div>
                </div>
            </div>


        `;

        
    });



};

// modal 

const displayModal = (d) => {
    const modalContainer = document.querySelector('#modal-section');
    const myColor = myColorUpdate(d);
    modalContainer.innerHTML = '';

            const dateCreated = d.createdAt.slice(0, 10);
            const dateUpdated = d.updatedAt.slice(0, 10);
        
            let priorityColor = [];

            priorityBtnColor(d,priorityColor);


            const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            attachmentColor(label , buttonClasses);

            


            return `<button class="border ${buttonClasses.join(' ')} rounded-2xl px-1"> ${label} </button>` });
        
            const buttons = buttonsLabel.join(' ');

            modalContainer.innerHTML = `
              
                <dialog id="my_modal_5" class="modal ">
                    <div class="modal-box m-8">
                        <div class="modal-designs space-y-4">
                           <div class="heading-modal space-y-2">
                                <h2 class="text-2xl font-bold">${d.title}</h2>
                                <div class="opening-modal-head flex items-center gap-4">
                                    <button class="${myColor} rounded-2xl font-medium text-md p-1 border border-none text-white ">${d.status === 'open' ? 'Opened': 'Closed'}</button>
                                    <div class="sm:flex gap-4">
                                    <p class="flex items-center gap-2">
                                        <i class="fa-solid fa-circle text-[4px]"></i>
                                        <span class="opened-by-head   text-[12px] font-[400px] text-[#64748bFF]"> ${d.status === 'open' ? 'Opened': 'Closed'} by ${d.author? d.author.replace('_'," ").toUpperCase(): 'NO NAME'}</span>
                                    </p>
                                    <p class="flex items-center gap-2">
                                        <i class="fa-solid fa-circle text-[4px]"></i>
                                        <span class="opened-date-head text-[12px] font-[400px] text-[#64748bFF]">  ${dateCreated}</span>
                                    </p>
                                    </div>
                                </div>
                           </div>
                           <div id="modal-buttons">
                                ${buttons}
                            </div>

                            <p class="opened-date-head text-sm font-[400px] text-[#64748bFF]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
                            <div class="middle-details-modal flex justify-start gap- items-center">
                                <div class="w-[300px] p-4">
                                    <p class="text-sm font-[400px] text-[#64748bFF]">Assignee:</p>
                                    <p class="text-sm font-[400px]">${d.assignee?d.assignee.replace('_'," ").toUpperCase():'NO NAME'}</p>
                                </div>
                                <div class="w-[300px]">
                                    <p class="text-sm font-[400px] text-[#64748bFF]">Priority:</p>
                                    <button class="border ${priorityColor.join(' ')} font-medium rounded-2xl px-1">${d.priority}</button>
                                </div>
                            </div>
                        </div>

                        <div class="modal-action">
                            <form method="dialog">
                                
                                <button class="btn bg-[#4a00ffFF] text-white px-4 py-2 font-semibold rounded-md">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            
            `
   

};


document.querySelector('#search-issue').addEventListener('click' , ()=>{

    const searchInp = document.querySelector('#search-issue-inp');
    const searchValue = searchInp.value;

    loadsearchIssues(searchValue);
    

});
loadAllIssues();




// "data": [
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },