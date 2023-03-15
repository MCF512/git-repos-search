let form = document.forms.search;
let totalResults = document.querySelector('.total__count');
let reposField = document.querySelector('.repos__field')

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.repoName.value) {
    alert('Введите название')
  } else {
    request(`https://api.nomoreparties.co/github-search?q=${form.repoName.value}`)
  }
})

async function request(url) {
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    let items = json.items;

    if (items.length == 0) {
      alert('Репозиториев с таким названием не найдено')
    } else {
      totalResults.innerHTML = `Всего репозиториев: ${json.total_count}`;
      reposField.innerHTML = ''

      console.log(items)

      items.forEach(item => {
        reposField.innerHTML += `
        <li class="repo">
        <a href="${item.html_url}" target="_blank" class="repo__name">${item.full_name}</a>
        <a href="${item.owner.html_url}" target="_blank" class="repo__author">Автор: ${item.owner.login}</a>
        <p class="repo__description">${item.description ? item.description : 'Нет описания'}</p>
      </li>
        `
      })
    }
  }
}

function showRepos(obj) {
  return `
  <li class="repo">
        <a href="#" class="repo__name">asda/dasd</a>
        <a href="#" class="repo__author">Автор: Alan Alan</a>
        <p class="repo__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint, reiciendis
          maiores
          repellat, facere obcaecati explicabo quod quia consequatur nostrum nam cumque dolores eaque inventore
          distinctio
          perferendis exercitationem adipisci necessitatibus?</p>
      </li>
  `
}