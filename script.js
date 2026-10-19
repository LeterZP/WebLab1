// Объект draw для реализации изменения рисунка
const canvas = document.getElementById("canvas");
const draw = {
    context: canvas.getContext("2d"),
    size: Math.min(canvas.height / 2,
                    canvas.width / 2),
    center: {
        x: canvas.height / 2,
        y: canvas.width / 2, 
    },

    coordinates: () => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        context.fillStyle = "black";

        function lines() {
            context.beginPath();
            context.moveTo(center.x - size, center.y);
            context.lineTo(center.x + size, center.y);
            context.moveTo(center.x, center.y + size);
            context.lineTo(center.x, center.y - size);
            context.closePath();
            context.stroke();
        };

        function xArrow(x, y) {
            let px = x - 0.1*size;
            let p1y = y + 0.02*size;
            let p2y = y - 0.02*size;
            context.beginPath();
            context.moveTo(px, p1y);
            context.lineTo(x, y);
            context.lineTo(px, p2y);
            context.closePath();
            context.fill();
            context.fillText("x", x - 0.05*size, y - 0.05*size);
        };

        function yArrow(x ,y) {
            let py = y + 0.1*size;
            let p1x = x - 0.02*size;
            let p2x = x + 0.02*size;
            context.beginPath();
            context.moveTo(p1x, py);
            context.lineTo(x, y);
            context.lineTo(p2x, py);
            context.closePath();
            context.fill();
            context.fillText("y", x + 0.05*size, y + 0.05*size);
        };

        function marks() {
            context.beginPath();
            context.moveTo(center.x + 0.25*size, center.y - 0.02*size);
            context.lineTo(center.x + 0.25*size, center.y + 0.02*size);
            context.moveTo(center.x + 0.5*size, center.y - 0.02*size);
            context.lineTo(center.x + 0.5*size, center.y + 0.02*size);
            context.moveTo(center.x + 0.75*size, center.y - 0.02*size);
            context.lineTo(center.x + 0.75*size, center.y + 0.02*size);
            context.moveTo(center.x - 0.25*size, center.y - 0.02*size);
            context.lineTo(center.x - 0.25*size, center.y + 0.02*size);
            context.moveTo(center.x - 0.5*size, center.y - 0.02*size);
            context.lineTo(center.x - 0.5*size, center.y + 0.02*size);
            context.moveTo(center.x - 0.75*size, center.y - 0.02*size);
            context.lineTo(center.x - 0.75*size, center.y + 0.02*size);
            context.moveTo(center.x - 0.02*size, center.y + 0.25*size);
            context.lineTo(center.x + 0.02*size, center.y + 0.25*size);
            context.moveTo(center.x - 0.02*size, center.y + 0.5*size);
            context.lineTo(center.x + 0.02*size, center.y + 0.5*size);
            context.moveTo(center.x - 0.02*size, center.y + 0.75*size);
            context.lineTo(center.x + 0.02*size, center.y + 0.75*size);
            context.moveTo(center.x - 0.02*size, center.y - 0.25*size);
            context.lineTo(center.x + 0.02*size, center.y - 0.25*size);
            context.moveTo(center.x - 0.02*size, center.y - 0.5*size);
            context.lineTo(center.x + 0.02*size, center.y - 0.5*size);
            context.moveTo(center.x - 0.02*size, center.y - 0.75*size);
            context.lineTo(center.x + 0.02*size, center.y - 0.75*size);
            context.closePath();
            context.stroke();
            context.fillText("R", center.x + 0.22*size, center.y - 0.05*size);
            context.fillText("R", center.x + 0.05*size, center.y - 0.22*size);
        };

        lines();
        xArrow(center.x + size, center.y);
        yArrow(center.x, 0);
        marks();
    },

    form : (R) => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        R = 0.25*size*R;
        context.fillStyle = `rgb(0, 150, 255)`;
        
        function circle() {
            context.beginPath();
            context.arc(center.x, center.y, R / 2, 0, - Math.PI / 2, true);
            context.lineTo(center.x, center.y);
            context.closePath();
            context.fill();
        };

        function triangle() {
            context.beginPath();
            context.moveTo(center.x, center.y);
            context.lineTo(center.x, center.y - R);
            context.lineTo(center.x - R, center.y);
            context.closePath();
            context.fill();
        };

        function rectangle() {
            context.fillRect(center.x, center.y, - R / 2, R);
        };

        context.clearRect(center.x - size, center.y - size, center.x + size, center.y + size);
        circle();
        triangle();
        rectangle();
        draw.coordinates();
    },

    point: (x, y) => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        x = center.x + 0.25*size*x;
        y = center.y - 0.25*size*y;
        context.fillStyle = "red";

        function downArrow(x) {
            let y = center.y + size;
            let py = y - 0.1*size;
            let p1x = x + 0.02*size;
            let p2x = x - 0.02*size;
            context.beginPath();
            context.moveTo(p1x, py);
            context.lineTo(x, y);
            context.lineTo(p2x, py);
            context.closePath();
            context.fill();
        };

        function point(x, y) {
            context.beginPath();
            context.arc(x, y, 0.02*size, 0, 2*Math.PI);
            context.closePath();
            context.fill();
        };

        if (y > center.y + 0.98*size) downArrow(x);
        else point(x, y);
    },
};



// Объект values для взаимодействия со значениями формы
const values = {
    X: document.getElementsByName("X"),
    Y: document.getElementsByClassName("Y"),
    R: document.getElementsByClassName("R"),

    disableButton: (i) => {
        for (let j = 0; j < values.R.length; j++) {
            values.R[j].disabled = false;
        };
        values.R[i].disabled = true;
    },

    resetValues: () => {
        for (let i = 0; i < values.X.length; i++) {
                values.X[i].checked = false;
            };
        values.Y[0].value = "";
        values.disableButton(0);
    },

    getX: () => {
        let radio;
        for (let i = 0; i < values.X.length; i++) {
            if (values.X[i].checked === true) radio = values.X[i];
        };
        return Number(radio.value);
    },

    getY: () => {;
        return Number(values.Y[0].value);
    },

    getR: () => {
        let button;
        for (let i = 0; i < values.R.length; i++) {
            if (values.R[i].disabled === true) {
                button = values.R[i];
                break;
            };
        };
        return Number(button.value);
    },

    validValues: () => {
        let radio = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
        let min = -5; let max = 3;
        let button = [1, 1.5, 2, 2.5, 3];
        let x = values.getX();
        let y = values.getY();
        let r = values.getR();
        for (let i = 0; i < radio.length; i++) {
            if (x === radio[i]) break;
            if (i + 1 === radio.length) return false;
        };
        if (y === NaN || y > max || y < min) return false;
        for (let i = 0; i < button.length; i++) {
            if (r === button[i]) break;
            if (i + 1 === button.length) return false;
        };
        return true;
    },

    getValues: () => {
        if (values.validValues()) return [values.getX(), values.getY(), values.getR()];
        return [undefined, undefined, undefined];
    },
};



// Объект для взаимодействия с хранилищем
const storage = {
    storage: window.localStorage,
    data: [],

    loadAllItems: () => {
        let i = 0;
        while (storage.storage.key(i) != null) {
            storage.data[i] = storage.parseItem(storage.storage.getItem(i));
            storage.showItem(i, storage.data[i]);
            i++;
        };
    },

    parseItem: (str) => {
        let arr = str.split(",");
        if (arr.length != 5) return undefined;
        return [Number(arr[0]), Number(arr[1]), Number(arr[2]), Boolean(arr[3] === "true"), arr[4]];
    },

    addItem: (x, y, r) => {
        let item = [x, y, r, isHitted(x, y, r), "hehehe"];
        let key = storage.data.length;
        storage.storage.setItem(key, item);
        storage.data[key] = item;
        storage.showItem(key, item);
    },

    getItem: (key) => {
        return storage.data[key];
    },

    clearStorage: () => {
        storage.data = [];
        storage.storage.clear();
    },

    showItem: (i, item) => {
        const table = document.getElementById("storage");
        const tr = document.createElement("tr");
        tr.id = "item " + i;
        if (item[3]) tr.className = "success"; else tr.className = "failure";
        const arr = [i, ...item];
        for (let j in arr) {
            const J = document.createElement("td");
            J.appendChild(document.createTextNode(arr[j]));
            tr.appendChild(J);
        };
        if (i != 0) {
            const previousTr = document.getElementById("item " + (i - 1));
            table.insertBefore(tr, previousTr);
        } else table.appendChild(tr);
    },
};



// функция для вычисления попадания точки
function isHitted(x, y, r) {
    if (y >= 0 && x**2 + y**2 <= ((r/2)**2)) return true;
    if (x <= 0 && y >= 0 && y <= x + r) return true;
    if (x <= 0 && y <= 0 && x >= -r/2 && y >= -r) return true;
    return false;
};


// инициализация начального содержимого страницы
draw.context.font = draw.size*0.1 + "px serif";
draw.form(1);
storage.loadAllItems();



// инициализация ивентов
const form = document.forms["form"];

for (let i = 0; i < values.R.length; i++) {
    values.R[i].addEventListener("click", (event) => {
        event.preventDefault();
        values.disableButton(i);
    },);
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const [x, y, r] = values.getValues();
    if (!(x === undefined || y === undefined || r === undefined)) {
        draw.form(r);
        draw.point(x, y);
        storage.addItem(x, y, r);
        console.log(storage.getItem(storage.data.length - 1));
        values.resetValues();
    };
},);

form.addEventListener("reset", (event) => {
    event.preventDefault();
    values.resetValues();
},);

