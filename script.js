class Base {
    constructor(base, minutes) {
        this.base = base;
        this.minutes = minutes;
        this.next = null;
        this.past = null;
    }

    getBase() {
        return this.base;
    }

    getMinutes() {
        return this.minutes;
    }

    getInfo() {
        return `Base: ${this.base}, Duration: ${this.minutes} minutes`
    }

    infoCard(hour, minutes) {
        return `<div><p>Base: ${this.getBase()}</p><p>arrives at: ${hour}</p><p>there is ${minutes} minutes left</p>                                 
                </div>`;
    }

}

class Routes {
    constructor() {
        this.inicio = null;
        this.lenght = 0;
    }

    add(base){
        if(this.inicio === null){
            this.inicio = base;
            base.next = this.inicio;
            base.past = this.inicio;
            this.lenght++;
        } else {
            let past = this.inicio.past;
            base.next = this.inicio;
            base.past = past;
            past.next = base;
            this.inicio.past = base;
            this.lenght++;
        }

    }

    list() {
        let listInfo = '';
        let temp = this.inicio;
        if(temp == null) {
            return '<div>The list is empty</div>';
        }
        else {
            let temp = this.inicio;
            do {
               listInfo += `<div>${temp.getInfo()}</div></br>`;
                temp = temp.next;
            } while (temp != this.inicio);
            return listInfo;
        }
    }

    delete(name) {
        let eliminar;
        let tail;
        let next;
        if(this.inicio == null) {
            return null;
        }
        else if (this.inicio.getBase() == name && this.lenght === 1) {
            eliminar = this.inicio;
            this.inicio = null;
            eliminar.next = null;
            eliminar.past = null;
            this.lenght--;
            return eliminar;
        } else if (this.inicio.getBase() == name) {
            eliminar = this.inicio;
            tail = eliminar.past;
            next = eliminar.next;
            this.inicio = next;
            this.inicio.past = past;
            tail.next = this.inicio;
            eliminar.past = null;
            eliminar.next = null;
            this.lenght--;
            return eliminar;
        } else {
            let past = this.inicio;
            let current = this.inicio.next;
            while(current !== this.inicio) {
                if(current.getBase() == name && current.next == this.inicio) {
                    eliminar = current;
                    next = eliminar.next;
                    past.next = next;
                    next.past = past;
                    eliminar.next = null;
                    eliminar.past = null;
                    this.lenght--;
                    return eliminar;
                } else {
                    past.current;
                    current.current.next;
                }
            }
            return null;
        }
    }
    
    createCard(base, hour, minutes) {
        let card = '';   
        let hours = 0;
        let find = this._findBase(base);

        if(!find) {
            return null;
        } else {
            while(minutes >= 0) {
                card += find.infoCard(this._hoursConvert(hour, hours), minutes) + '\n' + '------------------------------';               
                hours += find.next.getMinutes();
                minutes -= find.next.getMinutes();
                find = find.next;
            }
            return card;
        }   
    }

    
    _hoursConvert(hour, minutes) {
        let minutesInHour = ((hour * 60) + minutes) / 60;
        let totalHours = Math.trunc(minutesInHour);
        let minusMinutes = Math.round((minutesInHour - totalHours) * 60);
        if(minusMinutes < 10) {
            return `${totalHours}:0${minusMinutes}`;
        } else {
            return `${totalHours}:${minusMinutes}`;
        }
    }

    _findBase(name) {
        let base = this.inicio;
        if(!base) {
            return null;
        } else {
            do{
                if(base.getBase() == name) {
                    return base;
                } else {
                    base = base.next;
                }
            } while(base !== this.inicio);
            return null;
        }
    }

}

let newBase = new Routes();

let details = document.getElementById('details');

const btnDelete = document.getElementById('btnDelete');
const btnAdd = document.getElementById('btnAdd');
const btnList = document.getElementById('btnList');


btnAdd.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let duration = Number(document.getElementById('minutes').value);
    let base = new Base(name, duration);
    newBase.add(base);
    details.innerHTML = `<div>The base ${base.getBase()} has been created</div>`;
});

btnDelete.addEventListener('click', () =>{
    let name = document.getElementById('nameDel').value;
    let deleteBase = newBase.delete(name);
    if(deleteBase) {
        details.innerHTML = `<div>${name} has been eliminated</div>`;
    } else if(!name) {
        details.innerHTML = `<div>Enter a base to remove</div>`;
    } else {
        details.innerHTML = `<div>${name} dont exist</div>`;
    }
});

btnList.addEventListener('click', () =>  {
    let list = newBase.list()
    if(!list) {
        details.innerHTML = '<div>The list is empty</div>';
    }
    details.innerHTML = `${newBase.list()}`
});

let btnCreateCard = document.getElementById('btnCreateCard');
btnCreateCard.addEventListener('click', () =>{
    let base = document.getElementById('card').value;
    let hour = Number(document.getElementById('cardHour').value);
    let minutes = Number(document.getElementById('minutes').value); 
    let card = newBase.createCard(base, hour, minutes);
    if(!base) {
        details.innerHTML = '<div>The list is empty</div>';
    } else if(!card) {
        details.innerHTML = `<div>${base} dont exist</div>`;
    } else {
        details.innerHTML = `<div>The route beggins in: ${base}</div> </br>
        <div>details: </div> </br>
        <div>${card}</div>`;
    }
});