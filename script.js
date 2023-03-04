let search = document.getElementsByClassName('form-control')[0]
let serBtn = document.getElementsByClassName('btn')[1];
let cardDiv = document.getElementsByClassName('row')[0];
let deleteBtn = document.getElementsByClassName('btn')[0];
let displayHistory = document.getElementsByClassName('history')[0];
let arr1 = [];

    serBtn.addEventListener('click', ()=>{
        if(search.value === null || search.value === ''){
            alert('Please Enter Something in Search Box');
        }else{
            
            fetch('https://www.googleapis.com/books/v1/volumes?q='+search.value).then((resp)=>resp.json()).then((data)=>{
                let arr = data.items
                
                arr.map((product)=>{
                    
                    cardDiv.innerHTML += `<div class="col">
                    <div class="card h-100">
                      <img src="${product.volumeInfo.imageLinks.thumbnail}" class="card-img-top " alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${product.volumeInfo.title}</h5>
                        <p class="card-text">Author : ${product.volumeInfo.authors}<br>
                        Page Count : <br>
                        Publisher : ${product.volumeInfo.publisher}</p>
                        
                      </div>
                      <button class="btn btn-light">Buy Now</button>
                    </div>
                  </div>`
                })

                
                     
                
        })
        arr1.push(search.value);
        
            if(localStorage.length==0){
                localStorage.setItem('history', arr1);
            }else{
                let str = localStorage.getItem('history').split(',');
                str.push(search.value);
                localStorage.setItem('history', str);
            }
        
        
        }
    })


    //Display History
    let msg = localStorage.getItem('history').split(',');
    if(localStorage.length != 0){
        displayHistory.classList.remove('hide');

        for(let i=0; i<msg.length; i++){
            displayHistory.innerHTML += `<p class='hisLog'>${msg[i]}</p><hr>`
        }
        
    }

    //Click on history to search
    let seahistory = document.getElementsByClassName('hisLog')

    for(let i =0; i<seahistory.length; i++){
        seahistory[i].addEventListener('click', ()=>{
            search.value = msg[i];
        })
    }

    // Clear localstorage
    let m = document.getElementsByClassName('hisLog')[0];
    function deleted(){
        localStorage.clear();
        displayHistory.classList.add('hide')
        m.remove();
        
    }