//Credencial: 03cd41f3d537ca03b78b89a342a76200
//https://api.vagalume.com.br/search.php?art=metalica&mus=one&apiKey=03cd41f3d537ca03b78b89a342a76200

const input = document.getElementById('search')
const element = document.querySelector('.renderList')
const emtpyElement = document.getElementById('emptyEelement')
const words = document.querySelector('#words')
const navigation = document.querySelector('#navigations')
const apiUrl = `https://api.lyrics.ovh/`

const renderList = title => {
    const li = `
    <li class="song"> <span> ${title} </span> <button onclick="showSong(this)" data-song="${title}" class="btn_show"> Ver Letra </button> </li>
    `
    return element.innerHTML += li
}


const cleanHtml = () => {
    element.innerHTML = ''
    emtpyElement.innerHTML = ''
    words.innerHTML = ''
    navigation.innerHTML = ''
}

const funcNavigation = data => {
    if (data['next']) {
        console.log('next')
        navigation.innerHTML += `<button onclick="listMoreSong('${data['next']}')"> Próximo </button>`
    }

    if (data['prev']) {
      console.log('prev')
      navigation.innerHTML +=  `<button onclick="listMoreSong('${data['prev']}')"> Anterior</button>`
  }
}

const listMoreSong = async link => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${link}`)
    const data = await response.json()
    element.innerHTML = ''
    emtpyElement.innerHTML = ''
    words.innerHTML = ''
    console.log(data)
    data.data.map(item => renderList(item['title']))
}

const apiSong = async input => {
    const response = await fetch(`${apiUrl}/suggest/${input}`)
    const data = await response.json()
    if (data['data'].length == 0) {
        emtpyElement.innerHTML += `<div id="empty"> <h5> Nenhum artista foi encontrado </h5> </div>`
        return false;
    }
    // funcNavigation(data)
    data.data.map(item => renderList(item['title']))
}

const searchSong = () => {
    cleanHtml()
    const inputSearch = input.value.trim()
    if (!inputSearch) {
        emtpyElement.innerHTML += `<div id="empty"> <h5> Campo Vazio </h5> </div>`
        input.focus()
        return false;
    }
    apiSong(inputSearch)
}


const showSong = async title => {
    cleanHtml()   
    const attr = title.getAttribute('data-song')

    let response = await fetch(`https://api.vagalume.com.br/search.php?art=${input.value.toLowerCase()}&mus=${attr.toLowerCase()}&apiKey=03cd41f3d537ca03b78b89a342a76200`)
    let data = await response.json()

    if (!data['mus']) {
        response =  await fetch(`https://api.lyrics.ovh/v1/${input.value.toLowerCase()}/${attr.toLowerCase()}`)
        data = await response.json()
    }

    if (data['mus'] || data['lyrics']) 
        document.querySelector('#words').innerHTML += `<h5> ${input.value.toUpperCase()} \t (${attr}) </h5> <pre> ${data['mus'] ? data['mus'][0]['text'] : data['lyrics']} </pre>`
    else 
       emtpyElement.innerHTML += `<div id="empty"> <h5> Letra Indisponivel </h5> </div>`


}



this.translate = text => {
    console.log(text)
    // cleanHtml()
    // const attr = title.getAttribute('data-song')
    // document.querySelector('#words').innerHTML += `<h5> ${input.value.toUpperCase()} \t (${attr}) </h5> <pre> ${text} </pre>`
}
