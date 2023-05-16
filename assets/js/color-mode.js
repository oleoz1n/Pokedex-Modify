var checkbox = document.getElementById('toggle')


function check(){
    if (checkbox.checked == true){
        console.log('check')
        document.getElementById('current-mode').classList.add('dark-mode')
        document.body.style.backgroundColor = "#2a2a2a";
    }

    else {
        console.log('no check')
        console.log('check')
        document.getElementById('current-mode').classList.remove('dark-mode')
        document.body.style.backgroundColor = "#f6f8fc";
    }
}