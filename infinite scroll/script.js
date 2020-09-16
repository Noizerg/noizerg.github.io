const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


let limit = 5;
let page = 1;



async function getPosts(){
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}




async function showPosts()
{
    const posts = await getPosts();
    for (let i in posts)
    {
        const newElement = document.createElement('div');
        newElement.classList.add('post');
        newElement.innerHTML +=` 
        <div class="number">${posts[i]['id']}</div>
            <div class="post-info">
                <h2 class="post-title">${posts[i]['title']}</h2>
                <p class="post-body">
                ${posts[i]['body']}
                </p>
            </div>
        `;
        postsContainer.appendChild(newElement);
    }
}



function showLoading()
{
loading.classList.add('show');
setTimeout(
    ()=>{
        loading.classList.remove('show');
        setTimeout(
            ()=>{
                page++;
                showPosts();
            },300);
    },1000
);

}

function filterPosts(e){
    console.log(typeof(e.data))
        const term = e.target.value.toUpperCase();
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            let titleOrigin = post.querySelector('.post-title').innerText
            let title = titleOrigin.toUpperCase();
            let body = post.querySelector('.post-body').innerText.toUpperCase();
            
            if (title.indexOf(term) > -1)
            {
                post.style.display = 'flex';
              //  let innerT = titleOrigin.substring(0,title.indexOf(term))+ '<span>' + titleOrigin.substring(title.indexOf(term),title.indexOf(term) + term.length) + '</span>';
                //post.querySelector('.post-title').innerHTML = innerT;
            }
            else if (body.indexOf(term) > -1)
            {
                post.style.display = 'flex';

            }
            else{
                post.style.display = 'none';
            }
        })
}


showPosts(); 


window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight)
    {
        showLoading();
    }
  }  );

  filter.addEventListener('input', filterPosts);
