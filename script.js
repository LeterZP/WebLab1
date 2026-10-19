const canvas = document.getElementById("canvas");
const draw = {
    context: canvas.getContext("2d"),
    size: Math.min(canvas.height / 2,
                    canvas.width / 2),
    center: {
        x: canvas.height / 2,
        y: canvas.width / 2, 
    },
};
draw.context.font = draw.size*0.1 + "px serif";

draw.coordinates = () => {
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
};

draw.form = (R) => {
    R = 0.25*draw.size*R;
    let context = draw.context;
    let center = draw.center;

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

    circle();
    triangle();
    rectangle();
};

draw.form(3);
draw.coordinates();

function disableButton(buttons, i) {
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].disabled = false;
    };
    if (i < buttons.length) buttons[i].disabled = true;
};

function getValues(X, Y, R) {
    function getX(X) {
        let radio;
        for (let i = 0; i < X.length; i++) {
            if (X[i].checked === true) {
                radio = X[i];
                X[i].checked = false;
                break;
            };
        };
        return radio.value;
    };

    function getY(Y) {
        let text = Y[0];
        Y[0].value = "";
        return text.value;
    };

    function getR(R) {
        let button;
        for (let i = 0; i < R.length; i++) {
            if (R[i].disabled === true) {
                button = R[i];
                break;
            };
        };
        disableButton(R, R.length);
        return button.value;
    };

    return [getX(X), getY(Y), getR(R)];
};

const X = document.getElementsByName("X");
const Y = document.getElementsByClassName("Y");
const R = document.getElementsByClassName("R");

for (let i = 0; i < R.length; i++) {
    R[i].addEventListener("click", (event) => {
        disableButton(R, i);
        event.preventDefault();
    },);
};

const form = document.forms["form"];

form.addEventListener("submit", (event) => {
    console.log(getValues(X, Y, R));
    event.preventDefault();
},);

form.addEventListener("reset", (event) => {
    event.preventDefault();
    disableButton(R, R.length);
},);

