document.addEventListener('DOMContentLoaded', function() {
  const db = firebase.firestore();

  var index = window.location.hash;
  index = index.slice(1);

  var nameInput = document.querySelector('.name-input');
  var genderInput = document.querySelector('.gender-input');
  var saveBtn = document.querySelector('.save-btn');
  var removeBtn = document.querySelector('.remove-btn');

  saveBtn.addEventListener('click', function() {
    db.collection("clients").doc(index).update({
      name: nameInput.value,
      gender: genderInput.value,
    }).then(function() {
      window.location.href = '/';
    }).catch(function(err) {
      console.log(err);
    });
  })

  removeBtn.addEventListener('click', function() {
    db.collection("clients").doc(index).delete().then(function() {
      window.location.href = '/';
    });
  })

  db.collection("clients").doc(index).get().then(function(snap) {
    nameInput.value = snap.data().name;
    if (snap.data().gender === 'male') {
      genderInput.innerHTML = `
        <option value="male"> Male </option>
        <option value="female"> Female </option>
      `
    }
    else {
      genderInput.innerHTML = `
        <option value="female"> Female </option>
        <option value="male"> Male </option>
      `
    }
  });
});