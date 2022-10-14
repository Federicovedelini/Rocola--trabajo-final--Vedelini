

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Debes ser mayor de edad para ver esta pagina ',
    
    icon: 'warning',

    
    showCancelButton: true,
    confirmButtonText: 'Si, soy mayor!',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Gracias por confirmar!',
        'Que disfrutes!',
        
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Debes ser mayor para ingresar a esta pagina',
        'error'
      )
    }
  })


const Clickbutton = document.querySelectorAll ('.button')
let tbody = document.querySelector('.tbody')
let carrito = []


Clickbutton.forEach (btn => {
    btn.addEventListener ('click', addToCarritoItem)
})

function addToCarritoItem(e){
    let button = e.target
    let item = button.closest('.card_fondo')
    let itemTitle = item.querySelector('.card-title').textContent;
    let itemPrice = item.querySelector('.precio').textContent;
    

    let newItem = {
        title: itemTitle,
         cantidad: 1,
         price: itemPrice

    }

    addItemCarrito(newItem)
    
}


function addItemCarrito(newItem){

   




let InputElemento = tbody.getElementsByClassName('input__elemento')

    for(let i =0; i < carrito.length ; ++i){
        if (carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            let inputValue = InputElemento[i]
            inputValue.value++;
           CarritoTotal()
            return null;
        }
    }

    
    carrito.push(newItem)

    renderCarrito()

}



function renderCarrito(){
  
    tbody.innerHTML = ""
    carrito.map(item => {
     let tr = document.createElement('tr')
     tr.classList.add('itemCarrito')
     const Content = `
     <th scope="row">1 </th>
         
         <td class="tabla_productos">
           <h6 class="titulo">${item.title}</h6>
         </td>
 
         <td class="tabla_precio"><p>${item.price}</p></td>
 
         <td class="tabla_cantidad">
           <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
           <button class="delete btn btn-danger">x</button>
         </td>
     `
 
     tr.innerHTML = Content;
     tbody.append(tr)


     tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
     tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    
 
 
    })

    CarritoTotal()

}

function CarritoTotal(){
    let Total = 0;
    let itemCartTotal = document.querySelector('.itemCartaTotal')
    carrito.forEach((item) => {
        const precio = Number(item.price.replace("$", ' '))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`

    addLocalStorage()
}

//Funcion eliminar carrito 



function removeItemCarrito(e) {
    let buttonDelete = e.target
    let tr = buttonDelete.closest(".itemCarrito")
    let title = tr.querySelector('.titulo').textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)     
            console.log('ro-cola bebidas') 
        
        
        
        }

    }
    tr.remove()
    CarritoTotal()
}


//Funcion eliminar 


function sumaCantidad(e){
    let sumaImput = e.target
    const tr = sumaImput.closest(".itemCarrito")
    const title = tr.querySelector('.titulo').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
           sumaImput.value < 1 ? (sumaImput.value = 1 ) : sumaImput.value;
           item.cantidad = sumaImput.value;
           CarritoTotal()
        }

    })
    

}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


window.onload = function() {
    let storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

