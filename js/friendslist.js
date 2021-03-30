const friendsArray = document.querySelector('#friendsArray');
const  form =  document.querySelector('#addFriendForm');
// create elements and render friendsArray
let x = parseInt(0);

function renderFriends(doc){
  let tr = document.createElement('tr');
  let th = document.createElement('th');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let cross =  document.createElement('span');



  let name = document.createElement('span');
  let email = document.createElement('span');

  name.textContent = doc.data().Name;
  email.textContent =  doc.data().Email;
  cross.textContent = 'x';

  td1.setAttribute('data-id',doc.id);
  td2.setAttribute('data-id',doc.id);
  th.setAttribute('scope',"row");
  th.textContent = ++x;

  td1.appendChild(name);
  td2.appendChild(email);
  td2.appendChild(cross);

  friendsArray.appendChild(tr);
  friendsArray.appendChild(th);
  friendsArray.appendChild(td1);
  friendsArray.appendChild(td2);


  cross.addEventListener('click',(e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('friends').doc(id).delete();
      setTimeout("location.reload(true);", 1000);
    }
  )
}

let friends = db.collection('friends').get().then((snapshot) => {
  //console.log(snapshot.docs);
  snapshot.docs.forEach(doc =>
   renderFriends(doc)
  )
});

form.addEventListener('submit',e => {
     e.preventDefault();
    db.collection('friends').add({
      Name: form.name.value,
      Email: form.email.value
    });
  setTimeout("location.reload(true);", 1000);
  }
)
