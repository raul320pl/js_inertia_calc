const form = document.getElementById('form')
const profile_w = document.getElementById('profile_w')
const profile_h = document.getElementById('profile_h')

form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(`W=${profile_w.value} H=${profile_h.value}`)
})