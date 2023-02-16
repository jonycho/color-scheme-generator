const formColor = document.getElementById("form-color")
const containerScheme = document.getElementById("container-scheme")

document.addEventListener('click',function(e){
    if(e.target.dataset.color){
        const colorEl = e.target
        handleCopyToClipboard(colorEl.dataset.color)
        
        colorEl.textContent = 'Copy to Clipboard'
        
        setTimeout(()=>{
          colorEl.textContent = colorEl.dataset.color
        }, 1000)
        
        
    }
})

function handleCopyToClipboard(color){
    
    const el = document.createElement('textarea');
    el.value = color;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
    
    
    
}

function renderColors(){
    const color =  document.getElementById("color-pick").value.slice(1)
    const colorScheme =  document.getElementById("color-scheme").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}`)
        .then(res=>res.json())
        .then(data => {
            const colors = data.colors
            let colorsHTML = ""
            for(let color of colors){
                
                colorsHTML +=`
                    <div class="color-container">
                        <div style="background-color:${color.hex.value};height: 100%;">
                        </div>
                        <h2 data-color=${color.hex.value}>${color.hex.value}</h2>
                    </div>
                `
            }
            containerScheme.innerHTML = colorsHTML
        })
        
}



formColor.addEventListener("submit", function(e){
    e.preventDefault()  
    renderColors()
})




renderColors()