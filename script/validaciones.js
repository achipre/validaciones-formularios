export function validar(input) {
  const tipoDeInput = input.dataset.tipo;
  if(validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  if(input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMsjError(tipoDeInput, input);
  }
}

const tipoError = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
]

const msjErrores = {
  nombre: {
    valueMissing: 'El campo nombre no puede estar Vacio',
  },
  email: {
    valueMissing: 'El campo correo no puede estar Vacio',
    typeMismatch: 'El correo no es valido',
  },
  pass: {
    valueMissing: 'El campo pass no puede estar Vacio',
    typeMismatch: 'El correo no es valido',
    patternMismatch: "Al menos 6 carácteres, máximo 12 carácteres, mínimo una letra minúscula, mínimo una letra mayúscula, mínimo un núnmero y no puede contener carácteres especiales",
  },
  nacimiento: {
    valueMissing: 'El campo nacimiento no puede estar Vacio',
    customError: 'Debes tener al menos 18 años',
  },
  phone: {
    valueMissing: 'El campo número telefónico no puede estar Vacio',
    patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
  },
  address: {
    valueMissing: 'El campo direccion no puede estar vacio',
    patternMismatch: 'El formato direccion debe tener minimo 10 caracteres'
  },
  city: {
    valueMissing: 'El campo ciudad no puede estar vacio',
    patternMismatch: 'El formato requerido es minimo 4 caracteres'
  },
  province: {
    valueMissing: 'El campo provincia o Estado esta vacio',
    patternMismatch: 'El formato requerido es minimi 4 caracteres'
  },
}

const validadores = {
  nacimiento: (input) => validacion(input)
}

function mostrarMsjError(tipoDeInput, input) {
  let msj = ''
  tipoError.forEach(e => {
    if(input.validity[e]){
      console.log(tipoDeInput, e);
      console.log(input.validity[e]);
      console.log(msjErrores[tipoDeInput][e]);
      msj = msjErrores[tipoDeInput][e];
    }
  })

  return msj  
}

function validacion(inputBirth) {
  const dateInput = new Date (inputBirth.value);
  let msjEdad = '';
  if(!validarEdad18(dateInput)) {
    msjEdad = 'Debes tener al menos 18 años';
  } ;
  inputBirth.setCustomValidity(msjEdad);
}

function validarEdad18(date) {
  const dateToday = new Date();
  const diffdate = new Date(
    date.getUTCFullYear() + 18, 
    date.getUTCMonth(), 
    date.getUTCDate()
  );
  return (diffdate < dateToday);
  
}