const API_KEY="KsZLDr69nDEELdE1IQEZmZAtpXRbSKlz"
let total_count = 0;

    const PAGE_SIZE=10;
    let offset=0;
    function handleClickRandom() {
        console.log("handleClickRandom called");   
        const search = "api.giphy.com/v1/gifs/random"; 
        const elementOutputArea = document.getElementById("outputArea");
        let url = `http://${search}?api_key=${API_KEY}`;
        console.log('url=' + url);

        fetch(url, {method: "GET"})
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                const data = json.data;
                console.log(data);
                const url = json.data.images.fixed_height.url;
                console.log(url);
                let img=`<img src="${url}" alt="${data.title}" />`
                elementOutputArea.innerHTML = `<div>${JSON.stringify(data.title)}</div>`;
                elementOutputArea.innerHTML = img; 
            });
    }

    function handleClickArray() {
        console.log("handleClickArray called");   
        const elementOutputArea = document.getElementById("outputArea");
        const search = document.getElementById("search").value;
        let url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=${PAGE_SIZE}&offset=${offset}`
        console.log('url=' + url);

        fetch(url, {method: "GET"})
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                console.log(json.pagination);
                total_count = json.pagination.total_count;
                elementOutputArea.innerHTML = "";
                for (let data of json.data) {
                    const url = data.images.fixed_height.url;
                    let img=`<img src="${url}" alt="${data.title}" />`
                    elementOutputArea.innerHTML += img;
                    
                }
            });
    }


   function handleClickNext() {
        if (offset < total_count) {    
            offset += PAGE_SIZE;
            handleClickArray();
        }
   }    

    function handleClickPrev() {
        console.log(offset);
        if (offset >= PAGE_SIZE) {
            offset -= PAGE_SIZE;
            handleClickArray();
        }
    }   
