const issueCount = document.querySelector('#issue-count');


 const loadAllIssues = async () => {

    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
   
    displayAllIssues(data.data);

 };
 const loadSelectiveIssues = async (currentStatus) => {
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

    if(currentStatus === 'open'){
        displayOpen(open);
        issueCount.innerText = open.length;

    }
    else{
        displayClosed(closed);
        issueCount.innerText = closed.length;
    }
    
 };


 const displayAllIssues = (data) => {
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

        if(d.priority === 'high'){ priorityColor.push('border-red-600','bg-red-100', 'text-red-600 ') }
        else if(d.priority === 'medium') { priorityColor.push('border-yellow-600','bg-yellow-100', 'text-yellow-600 ')  }
        else{ priorityColor.push('border-gray-800','bg-gray-300', 'text-gray-800 ')  }

        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            if(label === 'bug'){ buttonClasses.push('border-red-500' , 'bg-red-100' , 'text-red-500') }
            else if(label === 'enhancement' ){buttonClasses.push('border-green-500' , 'bg-green-100' , 'text-green-500')}
            else if(label === 'help wanted'){buttonClasses.push('border-yellow-700' , 'bg-yellow-100' , 'text-yellow-700')}
            else if(label === 'documentation'){buttonClasses.push('border-blue-500' , 'bg-blue-100' , 'text-blue-500')}
            else if(label === 'good first issue'){buttonClasses.push('border-pink-500' , 'bg-pink-100' , 'text-pink-500')}

            return `<button class="border ${buttonClasses.join(' ')}  font-medium rounded-2xl p-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ');


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-[300px] shadow-2xl border border-gray-50 border-t-6 ${brColor}" >
                <div class="space-y-3 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            ${d.status === 'open' ? openImage : closedImage}
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="space-y-3 h-[107px]">
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
                        ${d.author ? d.author:'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.assignee ? d.assignee : 'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
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
        
    

        let priorityColor = [];

        if(d.priority === 'high'){ priorityColor.push('border-red-600','bg-red-100', 'text-red-600 ') }
        else if(d.priority === 'medium') { priorityColor.push('border-yellow-600','bg-yellow-100', 'text-yellow-600 ')  }
        else{ priorityColor.push('border-gray-800','bg-gray-300', 'text-gray-800 ')  }

        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            if(label === 'bug'){ buttonClasses.push('border-red-500' , 'bg-red-100' , 'text-red-500') }
            else if(label === 'enhancement' ){buttonClasses.push('border-green-500' , 'bg-green-100' , 'text-green-500')}
            else if(label === 'help wanted'){buttonClasses.push('border-yellow-700' , 'bg-yellow-100' , 'text-yellow-700')}
            else if(label === 'documentation'){buttonClasses.push('border-blue-500' , 'bg-blue-100' , 'text-blue-500')}
            else if(label === 'good first issue'){buttonClasses.push('border-pink-500' , 'bg-pink-100' , 'text-pink-500')}

            return `<button class="border ${buttonClasses.join(' ')}  font-medium rounded-2xl p-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ')


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-[300px] shadow-2xl border border-gray-50 border-t-6 border-t-green-500" >
                <div class="space-y-3 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            <img class="w-full h-full" src="./assets/Open-Status.png" alt="" >
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="space-y-3 h-[107px]">
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
                        ${d.author ? d.author:'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.assignee ? d.assignee : 'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
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
        
    

        let priorityColor = [];

        if(d.priority === 'high'){ priorityColor.push('border-red-600','bg-red-100', 'text-red-600 ') }
        else if(d.priority === 'medium') { priorityColor.push('border-yellow-600','bg-yellow-100', 'text-yellow-600 ')  }
        else{ priorityColor.push('border-gray-800','bg-gray-300', 'text-gray-800 ')  }

        

        const buttonsLabel = d.labels.map((label) => { 
            let buttonClasses = [];
            if(label === 'bug'){ buttonClasses.push('border-red-500' , 'bg-red-100' , 'text-red-500') }
            else if(label === 'enhancement' ){buttonClasses.push('border-green-500' , 'bg-green-100' , 'text-green-500')}
            else if(label === 'help wanted'){buttonClasses.push('border-yellow-700' , 'bg-yellow-100' , 'text-yellow-700')}
            else if(label === 'documentation'){buttonClasses.push('border-blue-500' , 'bg-blue-100' , 'text-blue-500')}
            else if(label === 'good first issue'){buttonClasses.push('border-pink-500' , 'bg-pink-100' , 'text-pink-500')}

            return `<button class="border ${buttonClasses.join(' ')}  font-medium rounded-2xl p-1"> ${label} </button>` });
        
        const buttons = buttonsLabel.join(' ')


        // HTML GENERATION

        issueContainer.innerHTML += `
                    <div id="card" class="rounded-lg w-[300px] shadow-2xl border border-gray-50 border-t-6 border-t-purple-500" >
                <div class="space-y-3 p-4">
                    <div class="flex justify-between items-center gap-3">
                        <div class="w-8 h-8">
                            <img class="w-full h-full" src="./assets/Closed- Status .png" alt="">
                        </div>
                        <button class="${priorityColor.join(' ')}  p-1 w-20 rounded-4xl">${d.priority}</button>
                    </div>
                    <div class="space-y-3 h-[107px]">
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
                        ${d.author ? d.author:'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
                    </p>
                    </div>
                    <div>
                     <p class="text-[#64748bFF] font-[400px]">
                        ${d.assignee ? d.assignee : 'No Name'}
                    </p>
                    <p class="text-[#64748bFF] font-[400px]">
                        1/7/2024
                    </p>
                    </div>
                </div>
            </div>


        `;

        
    });



};
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