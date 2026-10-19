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
            context.fillText("1", center.x + 0.22*size, center.y - 0.05*size);
            context.fillText("1", center.x + 0.05*size, center.y - 0.22*size);
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
        return radio.value;
    },

    getY: () => {;
        return values.Y[0].value;
    },

    getR: () => {
        let button;
        for (let i = 0; i < values.R.length; i++) {
            if (values.R[i].disabled === true) {
                button = values.R[i];
                break;
            };
        };
        return button.value;
    },

    validValues: () => {
        let radio = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
        let min = -5; let max = 3;
        let button = [1, 1.5, 2, 2.5, 3];
        let x = parseFloat(values.getX(values.X));
        let y = parseFloat(values.getY(values.Y));
        let r = parseFloat(values.getR(values.R));
        for (let i = 0; i < radio.length; i++) {
            if (x === radio[i]) break;
            if (i + 1 === radio.length) return false;
        };
        if (y != parseFloat(y) || y > max || y < min) return false;
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



// инициализация динамического содержимого страницы
draw.context.font = draw.size*0.1 + "px serif";
draw.form(1);


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
        values.resetValues();
    };
},);

form.addEventListener("reset", (event) => {
    event.preventDefault();
    values.resetValues();
},);

