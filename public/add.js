document.addEventListener('DOMContentLoaded', function() {
  const db = firebase.firestore();

  var nameInput = document.querySelector('.client-name-wrap .name-input');
  var genderInput = document.querySelector('.client-gender-wrap .gender-input');
  var addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click' , addNewClient);

  function addNewClient() {
    var clientName = nameInput.value.trim();  
    var clientGender = genderInput.value.trim(); 
    if (clientGender !== 'male' && clientGender != 'female') {
      alert('invalid information');
      return;
    }

    nameInput.value = '';
    genderInput.value ='';
    
    // db.collection("idCounter").doc("idCounter").get().then(function(snap) {
    //   console.log(snap);
    //   var idCounter = snap.data().val + 1;

    //   db.collection("clients").doc(idCounter.toString()).set({
    //     name: clientName,
    //     gender: clientGender,
    //     id: idCounter,
    //   });

    //   db.collection("idCounter").doc("idCounter").update({
    //     val: idCounter,
    //   }).then(function() {
    //     console.log("update idcounter successful!");
    //   }).catch(function(err) {
    //     console.log(err);
    //   });
    // });

    async function process() {
      var idCounterRef = db.collection("idCounter").doc("idCounter");
      var snap = await idCounterRef.get();
      var idCounter = snap.data().val + 1;

      db.collection("clients").doc(idCounter.toString()).set({
        name: clientName,
        gender: clientGender,
        id: idCounter,
      }).then(function() {
        console.log("add client successful");
      });

      idCounterRef.update({
        val: idCounter,
      }).then(function() {
        console.log("update idcounter successful");
      });
    }

    process();
  } 
});