// Make Ajax request to fetch data from /data endpoint
fetch('/data')
.then(response => response.json())
.then(data => {
  const dataList = document.getElementById('data-list');
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    dataList.appendChild(listItem);
  });
})
.catch(error => console.error(error));