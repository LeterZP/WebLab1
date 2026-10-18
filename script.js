function coordinates() {
    
    let draw = Object();
    draw.canvas = document.getElementById("canvas");
    draw.context = draw.canvas.getContext("2d");
    draw.size = Math.min(draw.canvas.height / 2, draw.canvas.width / 2);
    draw.center = Object();
    draw.center.x = draw.canvas.width / 2;
    draw.center.y = draw.canvas.height / 2;
    draw.context.font = draw.size*0.1 + "px serif"

    draw.lines = () => {
        let canvas = draw.context;
        let size = draw.size;
        let center = draw.center;
        canvas.beginPath();
        canvas.moveTo(center.x - size, center.y);
        canvas.lineTo(center.x + size, center.y);
        canvas.moveTo(center.x, center.y + size);
        canvas.lineTo(center.x, center.y - size);
        canvas.closePath();
        canvas.stroke();
    };

    draw.yArrow = (x, y) => {
        let canvas = draw.context;
        let size = draw.size;
        let py = y + 0.1*size;
        let p1x = x - 0.02*size;
        let p2x = x + 0.02*size;
        canvas.beginPath();
        canvas.moveTo(p1x, py);
        canvas.lineTo(x, y);
        canvas.lineTo(p2x, py);
        canvas.closePath();
        canvas.fill();
        canvas.fillText("y", x + 0.05*size, y + 0.05*size);
    };

    draw.xArrow = (x, y) => {
        let canvas = draw.context;
        let size = draw.size;
        let px = x - 0.1*size;
        let p1y = y + 0.02*size;
        let p2y = y - 0.02*size;
        canvas.beginPath();
        canvas.moveTo(px, p1y);
        canvas.lineTo(x, y);
        canvas.lineTo(px, p2y);
        canvas.closePath();
        canvas.fill();
        canvas.fillText("x", x - 0.05*size, y - 0.05*size);
    };

    draw.marks = () => {
        let canvas = draw.context;
        let center = draw.center;
        let size = draw.size;
        canvas.beginPath();
        canvas.moveTo(center.x + 0.25*size, center.y - 0.02*size);
        canvas.lineTo(center.x + 0.25*size, center.y + 0.02*size);
        canvas.moveTo(center.x + 0.5*size, center.y - 0.02*size);
        canvas.lineTo(center.x + 0.5*size, center.y + 0.02*size);
        canvas.moveTo(center.x + 0.75*size, center.y - 0.02*size);
        canvas.lineTo(center.x + 0.75*size, center.y + 0.02*size);
        canvas.moveTo(center.x - 0.25*size, center.y - 0.02*size);
        canvas.lineTo(center.x - 0.25*size, center.y + 0.02*size);
        canvas.moveTo(center.x - 0.5*size, center.y - 0.02*size);
        canvas.lineTo(center.x - 0.5*size, center.y + 0.02*size);
        canvas.moveTo(center.x - 0.75*size, center.y - 0.02*size);
        canvas.lineTo(center.x - 0.75*size, center.y + 0.02*size);
        canvas.moveTo(center.x - 0.02*size, center.y + 0.25*size);
        canvas.lineTo(center.x + 0.02*size, center.y + 0.25*size);
        canvas.moveTo(center.x - 0.02*size, center.y + 0.5*size);
        canvas.lineTo(center.x + 0.02*size, center.y + 0.5*size);
        canvas.moveTo(center.x - 0.02*size, center.y + 0.75*size);
        canvas.lineTo(center.x + 0.02*size, center.y + 0.75*size);
        canvas.moveTo(center.x - 0.02*size, center.y - 0.25*size);
        canvas.lineTo(center.x + 0.02*size, center.y - 0.25*size);
        canvas.moveTo(center.x - 0.02*size, center.y - 0.5*size);
        canvas.lineTo(center.x + 0.02*size, center.y - 0.5*size);
        canvas.moveTo(center.x - 0.02*size, center.y - 0.75*size);
        canvas.lineTo(center.x + 0.02*size, center.y - 0.75*size);
        canvas.closePath();
        canvas.stroke();
        canvas.fillText("R", center.x + 0.22*size, center.y - 0.05*size);
        canvas.fillText("R", center.x + 0.05*size, center.y - 0.22*size);
    };

    draw.coordinates = () => {
        let size = draw.size;
        let center = draw.center;
        draw.lines();
        draw.xArrow(center.x + size, center.y);
        draw.yArrow(center.x, center.y - size);
        draw.marks();
    };

    draw.coordinates();
};

coordinates();