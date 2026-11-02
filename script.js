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

    // Функция для отрисовки координатной плоскости
    coordinates: () => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        context.fillStyle = "black";

        // Вспомогательная функция для отрисовки линий координатной плоскости
        function lines() {
            context.beginPath();
            context.moveTo(center.x - size, center.y);
            context.lineTo(center.x + size, center.y);
            context.moveTo(center.x, center.y + size);
            context.lineTo(center.x, center.y - size);
            context.closePath();
            context.stroke();
        };

        // Вспомогательная функция для отрисовки стрелки оси X
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

        // Вспомогательная функция для отрисовки стрелки оси Y
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

        // Вспомогательная функция для отрисовки засечек
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

    // Функция для отрисвоки фигур на координатной плоскости
    form : (R) => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        R = 0.25*size*R;
        context.fillStyle = `rgb(0, 150, 255)`;
        
        // Вспомогательная функция для отрисовки четверти круга
        function circle() {
            context.beginPath();
            context.arc(center.x, center.y, R / 2, 0, - Math.PI / 2, true);
            context.lineTo(center.x, center.y);
            context.closePath();
            context.fill();
        };

        // Вспомогательная функция для отрисовки треугольника
        function triangle() {
            context.beginPath();
            context.moveTo(center.x, center.y);
            context.lineTo(center.x, center.y - R);
            context.lineTo(center.x - R, center.y);
            context.closePath();
            context.fill();
        };

        // Вспомогательная функция для отрисовки прямоугольника
        function rectangle() {
            context.fillRect(center.x, center.y, - R / 2, R);
        };

        context.clearRect(center.x - size, center.y - size, center.x + size, center.y + size);
        circle();
        triangle();
        rectangle();
        draw.coordinates();
    },

    // Функция для отрисовки точки на плоскости
    point: (x, y) => {
        let context = draw.context;
        let center = draw.center;
        let size = draw.size;

        x = center.x + 0.25*size*x;
        y = center.y - 0.25*size*y;
        context.fillStyle = "red";

        // Вспомогательная функция для отрисовки стрелки, направленной вниз
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

        // Вспомогательная функция для отрисовки точки
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



// Объект для функций различного назначения
const side = {
    // Функция для вычисления попадания точки
    isHitted: (x, y, r) => {
        if (y >= 0 && x**2 + y**2 <= ((r/2)**2)) return "да";
        if (x <= 0 && y >= 0 && y <= x + r) return "да";
        if (x <= 0 && y <= 0 && x >= -r/2 && y >= -r) return "да";
        return "нет";
    },

    // Функция для нахождения текущего времени UTC в виде строки
    getTime: () => {
        const date = new Date();
        return date.toUTCString().split(",")[1];
    },

    // Функция для превращения строки UTC в местное время
    parseTime: (time) => {
        const date = new Date(time);
        return date.toLocaleString("ru-RU").split(",").join("");
    },
};



// Объект values для взаимодействия со значениями формы
const values = {
    X: document.getElementsByName("X"),
    Y: document.getElementsByName("Y"),
    R: document.getElementsByName("R"),

    Xvalids: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    Yvalids: [-5, 3],
    Rvalids: [1, 1.5, 2, 2.5, 3],

    // Функция для выключения одной кнопки и включения остальных
    disableButton: (i) => {
        for (let j = 0; j < values.R.length; j++) {
            values.R[j].disabled = false;
        };
        values.R[i].disabled = true;
    },

    // Функция для сброса значений в форме
    resetValues: () => {
        for (let i = 0; i < values.X.length; i++) {
                values.X[i].checked = false;
            };
        values.Y[0].value = "";
        values.disableButton(0);
    },

    // Функция для получения всех X из формы
    getX: () => {
        let result = [];
        for (let i = 0; i < values.X.length; i++) {
            if (values.X[i].checked === true) result[result.length] = values.X[i].value;
        };
        return result;
    },

    // Функция для получения всех Y из формы
    getY: () => {
        let result = [];
        for (let i = 0; i < values.Y.length; i++) {
            result[result.length] = values.Y[i].value.split(',').join('.');
        };
        return result;
    },

    // Функция для получения всех R из формы
    getR: () => {
        let result = [];
        for (let i = 0; i < values.R.length; i++) {
            if (values.R[i].disabled === true) {
                result[result.length] = values.R[i].value;
            };
        };
        return result;
    },

    // Функция для проверки X на попадание в область валидных значений
    checkX: (x) => {
        for (let i = 0; i < values.Xvalids.length; i++) {
            if (x === values.Xvalids[i]) return true;
        };
        return false;
    },

    // Функция для проверки Y на попадание в область валидных значений
    checkY: (y) => {
        if (y >= values.Yvalids[0] && y <= values.Yvalids[1]) return true;
        return false;
    },

    // Функция для проверки R на попадание в область валидных значений
    checkR: (r) => {
        for (let i = 0; i < values.Rvalids.length; i++) {
            if (r === values.Rvalids[i]) return true;
        };
        return false;
    },

    // Функция для валидации значений и отправки сообщения в случае ошибки
    validateValues: (msg, value) => {
        let x = value[0];
        let y = value[1];
        let r = value[2];
        if (x.length != 1) msg.textContent = `Получено ${x.length} аргументов X, ожидалось 1`;
        else if (y.length != 1) msg.textContent = `Получено ${y.length} аргументов Y, ожидалось 1`;
        else if (r.length != 1) msg.textContent = `Получено ${r.length} аргументов R, ожидалось 1`;
        else {
            x = x[0]; y = y[0]; r = r[0];
            if (isNaN(x)) msg.textContent = `Полученное значение X = ${x} не является числом`;
            else if (isNaN(y)) msg.textContent = `Полученное значение Y = ${y} не является числом`;
            else if (isNaN(r)) msg.textContent = `Полученное значение R = ${r} не является числом`;
            else {
                x = Number(x); y = Number(y); r = Number(r);
                if (!values.checkX(x)) msg.textContent = `Значение X = ${x} не попадает в область допустимых значений`;
                else if (!values.checkY(y)) msg.textContent = `Значение Y = ${y} не попадает в область допустимых значений`;
                else if (!values.checkR(r)) msg.textContent = `Значение R = ${r} не попадает в область допустимых значений`;
                else {
                    return true;
                };
            };
        };
        msg.className = "failure";
        return false;
    },
};



// Объект для взаимодействия с хранилищем
const storage = {
    storage: window.localStorage,
    data: [],

    // Функция для загрузки всей информации из хранилища
    loadAllItems: () => {
        let i = 0;
        while (storage.storage.key(i) != null) {
            storage.data[i] = storage.parseItem(storage.storage.getItem(i));
            storage.showItem(i, storage.data[i]);
            i++;
        };
    },

    // Функция для превращения строки (из хранилища) в элемент таблицы
    parseItem: (str) => {
        let arr = str.split(",");
        if (arr.length != 5) return undefined;
        return [Number(arr[0]), Number(arr[1]), Number(arr[2]), arr[3], arr[4]];
    },

    // Функция для добавления значения в хранилище
    addItem: (x, y, r) => {
        let item = [x, y, r, side.isHitted(x, y, r), side.getTime()];
        let key = storage.data.length;
        storage.storage.setItem(key, item);
        storage.data[key] = item;
        storage.showItem(key, item);
    },

    // Функция для получения значения из хранилища по ключу
    getItem: (key) => {
        return storage.data[key];
    },

    // Функция для отчистки хранилища
    clearStorage: () => {
        storage.data = [];
        storage.storage.clear();
        const table = document.getElementById("storage");
        let i = 0;
        while (i < table.childNodes.length) {
            let e = table.childNodes[i];
            if (e.className == "success" || e.className == "failure") table.removeChild(e);
            else i++;
        };
        storage.loadAllItems();
    },

    // Функция для вывода элементов хранилища в таблицу
    showItem: (i, item) => {
        if (item == undefined) return;
        const table = document.getElementById("storage");
        const tr = document.createElement("tr");
        tr.id = "item " + i;
        item[3] === "да" ? tr.className = "success" : tr.className = "failure";
        item[4] = side.parseTime(item[4]);
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



// Инициализация начального содержимого страницы
draw.context.font = draw.size*0.1 + "px serif";
draw.form(1);
storage.loadAllItems();



// Инициализация ивентов
const form = document.forms["form"];
const button = document.getElementById("clear");

// Ивент на нажатие кнопки из поля R
for (let i = 0; i < values.R.length; i++) {
    values.R[i].addEventListener("click", (event) => {
        event.preventDefault();
        values.disableButton(i);
    },);
};

// Ивент на отправку формы
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const msg = document.getElementById("message");
    let value = [values.getX(), values.getY(), values.getR()];
    if (values.validateValues(msg, value)) {
        let [x, y, r] = [...value[0], ...value[1], ...value[2]];
        x = Number(x); y = Number(y); r = Number(r);
        draw.form(r);
        draw.point(x, y);
        storage.addItem(x, y, r);
        msg.className = "success";
        msg.textContent = `Данные X = ${x}, Y = ${y}, R = ${r} успешно добавлены`;
    };
},);

// Ивент на сброс формы
form.addEventListener("reset", (event) => {
    event.preventDefault();
    values.resetValues();
},);

// Ивент на сброс таблицы
button.addEventListener("click", (event) => {
    event.preventDefault();
    storage.clearStorage();
},);
