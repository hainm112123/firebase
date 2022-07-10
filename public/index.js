document.addEventListener('DOMContentLoaded', function() {
  const db = firebase.firestore();

  var clients = [];

  db.collection("clients").get().then(function(snap) {
    // console.log(snap);
    snap.forEach(function(doc) {
      clients.push(doc.data());
    });

    render(clients);    
  });

  // --------------------------------render------------------------------

  function render(clients) {
    var htmlClientsList = document.querySelector('.clients-list');
    while (htmlClientsList.children.length > 1) {
      htmlClientsList.removeChild(htmlClientsList.lastElementChild);
    }

    for (var i = 0 ; i < clients.length ; ++ i) {
      var htmlClient = document.createElement('tr');
      htmlClient.innerHTML = `
        <td>${clients[i].name}</td>
        <td>${clients[i].gender}</td>
        <td><button data-id="${clients[i].id}" class="edit-btn">Edit</button></td>
      `;
      htmlClientsList.appendChild(htmlClient);
    }

    var editBtns = document.querySelectorAll('.edit-btn');
    for (var editBtn of editBtns) {
      editBtn.addEventListener('click', function(event) {
        window.location.href = '/edit.html#' + event.target.dataset.id;
      });
    }
  }

  // --------------------------------Gender filter-----------------------------

  var genderFilter = document.querySelector('.gender-filter');
  genderFilter.addEventListener('change', onGenderFilter);
  function onGenderFilter() {
    var genderValue = genderFilter.value;
    if (genderValue === 'all') {
      render(clients);
      return;
    }
    var filterClients = clients.filter(function(client) {
      return client.gender === genderValue;
    });
    render(filterClients);
  }

});