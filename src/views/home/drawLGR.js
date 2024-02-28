/**
   *     4  5
   *   3      0
   *     2  1
   **/
export function drawLGR(ctx, x, y, startColor, endColor, posture) {
    switch (posture) {
        case 0:
            {

                ctx.beginPath();
                ctx.moveTo(x, y - 26)
                ctx.lineTo(x + 60, y - 26);
                ctx.lineTo(x + 60, y + 26);
                ctx.lineTo(x, y + 26);
                ctx.closePath();

                

                const grd = ctx.createLinearGradient(x, y, x + 60, y);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()

            }
            break;
        case 1:
            {

                ctx.beginPath();
                ctx.moveTo(x + 22.52, y - 13)
                ctx.lineTo(x + 52.52, y + 38.96);
                ctx.lineTo(x + 7.48, y + 64.96);
                ctx.lineTo(x - 22.52, y + 13);
                ctx.closePath();


                

                const grd = ctx.createLinearGradient(x, y, x + 30, y + 51.96);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()



            }
            break;
        case 2:
            {



                ctx.beginPath();
                ctx.moveTo(x - 22.52, y - 13)
                ctx.lineTo(x - 52.52, y + 38.96);
                ctx.lineTo(x - 7.48, y + 64.96);
                ctx.lineTo(x + 22.52, y + 13);
                ctx.closePath();


                

                const grd = ctx.createLinearGradient(x, y, x - 30, y + 51.96);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()



            }
            break;
        case 3:
            {




                ctx.beginPath();
                ctx.moveTo(x, y + 26)
                ctx.lineTo(x - 60, y + 26);
                ctx.lineTo(x - 60, y - 26);
                ctx.lineTo(x, y - 26);
                ctx.closePath();

                


                const grd = ctx.createLinearGradient(x, y, x - 60, y);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()


            }
            break;
        case 4:
            {



                ctx.beginPath();
                ctx.moveTo(x - 22.52, y + 13)
                ctx.lineTo(x - 52.52, y - 38.96);
                ctx.lineTo(x - 7.48, y - 64.96);
                ctx.lineTo(x + 22.52, y - 13);
                ctx.closePath();

                


                const grd = ctx.createLinearGradient(x, y, x - 30, y - 51.96);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()


            }
            break;
        case 5:
            {



                ctx.beginPath();
                ctx.moveTo(x - 22.52, y - 13)
                ctx.lineTo(x + 7.48, y - 64.96);
                ctx.lineTo(x + 52.52, y - 38.96);
                ctx.lineTo(x + 22.52, y + 13);
                ctx.closePath();

      

                const grd = ctx.createLinearGradient(x, y, x + 30, y - 51.96);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, endColor);
                ctx.fillStyle = grd;
                ctx.fill()


            }
            break;


    }
}


export function drawR(ctx, x, y, startColor, posture) {
    switch (posture) {
        case 0:
            {
                ctx.beginPath();
                ctx.moveTo(x, y - 8)
                ctx.lineTo(x + 40, y - 8);
                ctx.lineTo(x + 40, y + 8);
                ctx.lineTo(x, y + 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;
        case 1:
            {
                ctx.beginPath();
                ctx.moveTo(x + 11.26, y - 8)
                ctx.lineTo(x + 29.76, y + 25.54);
                ctx.lineTo(x + 7.24, y + 38.54);
                ctx.lineTo(x - 11.26, y + 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;
        case 2:
            {
                ctx.beginPath();
                ctx.moveTo(x - 11.26, y - 8)
                ctx.lineTo(x - 29.76, y + 25.54);
                ctx.lineTo(x - 7.24, y + 38.54);
                ctx.lineTo(x + 11.26, y + 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;
        case 3:
            {
                ctx.beginPath();
                ctx.moveTo(x, y + 8)
                ctx.lineTo(x - 40, y + 8);
                ctx.lineTo(x - 40, y - 8);
                ctx.lineTo(x, y - 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;
        case 4:
            {
                ctx.beginPath();
                ctx.moveTo(x - 11.26, y + 8)
                ctx.lineTo(x - 29.76, y - 25.54);
                ctx.lineTo(x - 7.24, y - 38.54);
                ctx.lineTo(x + 11.26, y - 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;
        case 5:
            {
                ctx.beginPath();
                ctx.moveTo(x - 11.26, y - 8)
                ctx.lineTo(x + 7.24, y - 38.54);
                ctx.lineTo(x + 29.76, y - 25.54);
                ctx.lineTo(x + 11.26, y + 8);
                ctx.closePath();

                ctx.fillStyle = startColor;
                ctx.fill()
            }
            break;


    }
}

//"hsl(30,100%,50%)";
export function isSimilar(startColor, endColor) {

    if (endColor == undefined) {
        return false
    }
    const [h1, s1, l1] = startColor.split(",");
    const startH = parseInt(h1.slice(4));
    const startS = parseInt(s1.slice(0, -1));
    const startL = parseInt(l1.slice(0, -2));

    const [h2, s2, l2] = endColor.split(",");
    const endH = parseInt(h2.slice(4));
    const endS = parseInt(s2.slice(0, -1));
    const endL = parseInt(l2.slice(0, -2));

    const absH = Math.abs(startH - endH);

    return (absH < 40 || absH > 320) && (Math.abs(startS - endS) < 40) && Math.abs(startL - endL) < 40
}


export function clear(ctx) {
    ctx.clearRect(0, 0, 6270, 6240);
}

export function formatColor(Color) {
    Color = Color.toLowerCase();
    let sColor = [];
    for (let i = 1; i < 7; i += 2) {
        sColor.push(parseInt("0x" + Color.slice(i, i + 2)));
    }

    sColor[0] /= 255, sColor[1] /= 255, sColor[2] /= 255;
    let max = Math.max(sColor[0], sColor[1], sColor[2]), min = Math.min(sColor[0], sColor[1], sColor[2]);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case sColor[0]: h = (sColor[1] - sColor[2]) / d + (sColor[1] < sColor[2] ? 6 : 0); break;
            case sColor[1]: h = (sColor[2] - sColor[0]) / d + 2; break;
            case sColor[2]: h = (sColor[0] - sColor[1]) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%)`;

}
