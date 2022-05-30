var db = firebase.database();
var update = document.getElementById('update');
update.disabled = true;

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return  document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}

function insertEstudiante(name,lastname){
    db.ref('Estudiante/').push({
        name:name,
        lastname:lastname,
    });
}

function insertClase(title,desc){
    db.ref('Clase/').push({
        title:title,
        desc:desc
    });


}

function onClickInsert(){
    var name = value("name");
    var lastname = value("lastname");
    var title = value("title");
    var desc = value("desc");
    if(name.length==0 || lastname.length==0 || title.length==0 || desc.length==0){ 
        alert("Campo Vacío"); 
    }else{ 
        inHTML("loadTable","");
        insertEstudiante(name,lastname); 
        insertClase(title,desc);
        asignation("name","");
        asignation("lastname","");
        asignation("title","");
        asignation("desc","");
        alert("El dato se guardó correctamente");
    }
}
function updateEstudiante(name,lastname,key){
    db.ref('Estudiante/'+key).update({
        name:name,
        lastname:lastname
    });
}

function updateClase(title,desc,key){
    db.ref('Clase/'+key).update({
        title:title,
        desc:desc
    });
}


function onClickUpdate(){
    var name = value("nameEdit");
    var lastname = value("lnEdit");
    var title = value("tiEdit");
    var desc = value("dcEdit");
    var key = value("key"); 
    if(name.length==0 || lastname.length==0 || title.length==0 || desc.length==0){ 
        alert("Campo Vacío"); 
    }else{ 
        inHTML("loadTable","");
        updateEstudiante(name,lastname,key);
        updateClase(title,desc,key);
        inHTML("editData","");
        alert("El campo se actualizó correctamente");
        update.disabled = true;
    }
}


function removedatos(key){
    if(confirm("¿Quieres elminar el dato?")){
        inHTML("loadTable","");
        db.ref('Estudiante/'+'Clase/'+key).remove();
        
    }
}

function table(name,lastname,title,desc,key){
    return '<tr><td>'+name+'</td><td>'+lastname+'</td><td>'+title+'</td><td>'+desc+'</td>'+
    '<td><a href="#" onclick="viewDataUpdate(\''+name+'\',\''+lastname+'\',\''+title+'\',\''+desc+'\',\''+key+'\')">'+
    '<i class="fas fa-edit blue icon-lg"></i></a></td>'+
    '<td><a href="#" onclick="removedatos(\''+key+'\')">'+
     '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(name,lastname,title,desc,key){
    var response = '<div class="form-group"><input type="hidden" value='+key+' id="key">' +
    '<input type="text" id="nameEdit" class="form-control" placeholder="Nombre" value='+name+'>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="Editar apellido" class="form-control" id="lnEdit">'+lastname+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="Editar título" class="form-control" id="tiEdit">'+title+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="Editar descripción" class="form-control" id="dcEdit">'+desc+'</textarea>'+
    '</div>';
    inHTML('editData',response);
    update.disabled = false;
}
var reference = db.ref('Estudiante/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.name,value.lastname,nodo);
            printHTML('loadTable',sendData);
    });    
});

var reference1 = db.ref('Clase/');    
reference1.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.title,value.desc,nodo);
            printHTML('loadTable',sendData);
    });    
});