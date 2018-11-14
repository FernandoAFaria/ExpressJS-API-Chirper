document.addEventListener('DOMContentLoaded', function () {
    let submitBtn = document.getElementById('submit-btn');
    let chirpfield = document.getElementById('chirp-list');
    let editSubmit = document.getElementById('editsubmit');

    function loadChirps() {

        $.get(
            "/api/chirps", function (data) {
               console.log(data)
                })
             .done(function (data) {
                
                    let numberOfChirps = data.nextid;
                    for (var i = 0; i < numberOfChirps; i++) {
                        try{
                            createElement(data[i].name, data[i].message, i);
                        }
                        catch(error) {}
                    }
                 
            })
    }

    function postChirp(name, message) {


        $.post("/api/submit", { "name": name, "message": message }
        ).done(function () {
            //I need to run a get method to pull the NEXT ID so i can set that as and ID to the new element
            $.get(
                "/api/chirps", function (data) {

                }).done(function (data) {
                    let currentid = data.nextid - 1;
                    createElement(name, message, currentid)
                })
        })

    }

    function createElement(name, message, id) {
        let chirper = document.createTextNode(name);
        let chirpMessage = document.createTextNode(message)
        //create a list
        let li = document.createElement('li');
        li.setAttribute('key', id);
        li.id = id;
        li.setAttribute('data-toggle', 'modal');
        li.setAttribute('data-target', '#editModal');

        //On click event to change the modal ID to the current ID for edditing
        li.addEventListener('click', function(){
            document.getElementById('editModal').setAttribute('edit-id', id)
        })

        //create a div wrapper for our chirp
        let divWrapper = document.createElement('div');
        divWrapper.className = "card border-primary mb-3";
        //create the card header and card body
        let divHeader = document.createElement('div');
        divHeader.className = "card-header";
        let divBody = document.createElement('div');
        divBody.className = 'card-body';
        //creates an edit button on each chirp
        // let div = document.createElement('button');
        // div.type = button;
        // div.className = "btn btn-secondary";
        // div.setAttribute('data-toggle', 'modal');
        // div.setAttribute('data-target', '')

        //need delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.append(document.createTextNode("X"));
        deleteBtn.className = "btn btn-primary float-right";
        deleteBtn.id = id;


        //Puts them all together
        divHeader.append(chirper);
        divHeader.append(deleteBtn)
        divBody.append(chirpMessage);
        divWrapper.append(divHeader);
        divWrapper.append(divBody)

        li.append(divWrapper)

        deleteBtn.addEventListener('click', removeChirp, false);


        chirpfield.appendChild(li)
    }

    function removeChirp(event) {
        let id = this.id;
        document.getElementById(id).remove();
        $.ajax({
            url: '/api/submit' + '/' + id,
            type: 'DELETE',
            success: function () {
                console.log('DELETED')
            }

        })


    }


    submitBtn.addEventListener('click', function () {
        let name = document.getElementById('name');
        let message = document.getElementById('message');

        postChirp(name.value, message.value);


    })

    editSubmit.addEventListener('click', function(){
        let editId = document.getElementById('editModal').getAttribute('edit-id');
        let name = document.getElementById('editName').value;
        let message = document.getElementById('editMessage').value;
        $.ajax({
            url: "/api/submit/" + editId,
            method: 'PUT',
            data: { name: name, message: message },
            success: function(){
                document.location.reload();
            }
        })
        console.log(editId)
    })



    loadChirps();




})