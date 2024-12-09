//#region Vars

const rockRadius = 100;
const rock = {
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    radius: rockRadius
};

const frags = [];
const runnerRadius = 25;
let isDragging = false;

const runners = [];
const fragRadius = 25;
let runnerMax = 1;

//#endregion

//#region Constructors

// Função de criação de fragmento
function createFragment(x, y) {
    return {
        x: x,
        y: y, 
        radius: fragRadius,
        drag: false
    };
};

// Função para criar um runner
function createRunner(frag) {
    let targetX = 0, targetY = 0, targetXspd = 0, targetYspd = 0; 

    // Escolhe o caminho mais rápido para a entrada
    switch(closestBorder(frag)) {
        case "left":
            targetX = -runnerRadius;
            targetY = frag.y;
            targetXspd = 2;
            break;
        case "right":
            targetX = canvas.width + runnerRadius;
            targetY = frag.y;
            targetXspd = -2;
            break;
        case "top":
            targetX = frag.x;
            targetY = -runnerRadius;
            targetYspd = 2;
            break;
        case "bottom":
            targetX = frag.x;
            targetY = canvas.height + runnerRadius;
            targetYspd = -2;
            break;
    }

    return {
        x: targetX, 
        y: targetY,
        radius: runnerRadius,
        spd: 2,
        xspd: targetXspd,
        yspd: targetYspd,
        draggedFragment: null,
        target: frag,
        returning: false
    };
};

//#endregion

//#region Updates

function updateFragments() {
    for (let frag of frags) {
        if (checkDeploy(frag)) {
            deploy(frag);
        }
    }
};

// Função update dos runners
function updateRunners() {
    if (frags.length !== 0 && runners.length < runnerMax) {  
        for (let frag of frags) {
            if (frag !== user.draggedFragment && runners.find((runner) => runner.target === frag) === undefined) {
                runners.push(createRunner(frag));
                break;
            }
        }
    }

    if (runners.length != 0) {
        for (let runner of runners) {
            if (isCollidingCircle(runner, runner.target)) {
                runner.returning = true;
            } else {
                runner.returning = false;
            }
            follow(runner);
        }
    }  
};

//#endregion

//#region Draws

// Função de desenho da pedra
function drawRock() {
    ctx.save();

    ctx.beginPath();
    ctx.arc(rock.x, rock.y, rockRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FDFEFE'
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = '#37333E';
    ctx.fill();

    ctx.restore();
};

// Função de desenho de um fragmento
function drawFragment(frag) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(frag.x, frag.y, fragRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FDFEFE";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#37333E";
    ctx.fill();

    ctx.restore();
};

// Função de desenho do runner
function drawRunner(runner) {
    ctx.save();
    
    ctx.beginPath();
    ctx.arc(runner.x, runner.y, runnerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#37333E";
    ctx.fill();
    
    ctx.restore();
};

//#endregion

//#region Events

// Centraliza a pedra ao carregar a página
window.addEventListener('load', () => {
    rock.x = (canvas.width / 2);
    rock.y = (canvas.height / 2);
});

// Centraliza a pedra ao reescalar a página
window.addEventListener('resize', () => {
    user.points += 10 * frags.length;
    frags.splice(0, frags.length);
    runners.splice(0, frags.length);
    rock.x = (canvas.width / 2);
    rock.y = (canvas.height / 2);
});

// EventListener para o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    // Pega as coordenadas do mouse
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Se estiver arrastando um fragmento, move o mesmo com o movimento do mouse
    if (isDragging && user.draggedFragment) {
        user.draggedFragment.x = mouseX;
        user.draggedFragment.y = mouseY;
    }
});

// Evento de clique do mouse
canvas.addEventListener('mousedown', () => {
    // Cria um fragmento de clicar com o mouse em cima da pedra
    if (isCollidingCircle(mouseX, mouseY, rock)) {
        const targetX = Math.random() * (window.innerWidth - 200) + 100;
        const targetY = Math.random() * (window.innerHeight - 200) + 100;

        while (isCollidingCircle(targetX, targetY, rock)) {
            targetX = Math.random() * (window.innerWidth - 200) + 100;
            targetY = Math.random() * (window.innerHeight - 200) + 100;
        }

        const newFragment = createFragment(targetX, targetY);
        frags.push(newFragment);
    }

    if (frags.length != 0) {
        // Checa de esta colidindo com algum fragmento, se estiver o arrasta
        for (let frag of frags) {
            if (isCollidingCircle(mouseX, mouseY, frag)) {
                isDragging = true;
                user.draggedFragment = frag;
                user.draggedFragment.drag = true;
                break;
            }
        }
    }
});

// EventListener de soltar o mouse
canvas.addEventListener('mouseup', () => {
    // Se estiver arrastando um fragmento, o solta
    if (isDragging && user.draggedFragment) {
        isDragging = false;
        user.draggedFragment.drag = false;
        user.draggedFragment = null;
    }
});

//#endregion

//#region Functions

// Checagem de colisão em retângulo
function isCollidingRet(x, y, ret = null) {
    // Caso (x, y, ret2) - Colisão de ponto com retângulo
    if (ret != null) {
        return x > ret.x && x < ret.x + ret.width &&
            y > ret.y && y < ret.y + ret.height;
            
    // Caso (ret1, ret2) - Colisão de dois retângulos
    } else {
        let ret1 = x;
        let ret2 = y;

        return ret1.x < ret2.x + ret2.width &&
            ret1.x + ret1.width > ret2.x &&
            ret1.y < ret2.y + ret2.height &&
            ret1.y + ret1.height > ret2.y;
    }
};

// Checagem de colisão em círculo
function isCollidingCircle(x, y, circle = null) {
    // Caso (x, y, circle) - Colisão de ponto com círculo
    if (circle != null) {
        const dx = x - circle.x;
        const dy = y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < circle.radius;
        
    // Caso (circle1, circle2) - Colisão entre dois círculos
    } else {
        let circle1 = x;
        let circle2 = y;

        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < (circle1.radius + circle2.radius);
    }
};

// Busca o fragmento arrastável no array de fragmentos
function userDragged(frag) {
    return frag == user.draggedFragment;
};

// Checa se o fragmento está na área de entrega
function checkDeploy(frag) {
    return frag.x <= frag.radius ||
        frag.x >= canvas.width - frag.radius ||
        frag.y <= frag.radius ||
        frag.y >= canvas.height - frag.radius;
};

// Entrega o fragmento e adiciona os pontos
function deploy(frag) {
    const index = frags.indexOf(frag);
    if (index !== -1) {
        frags.splice(index, 1);
        user.points += 10;
    }
};

// Função para buscar a borda mais próxima
function closestBorder(obj) {
    // Distâncias até cada borda
    const distLeft = Math.abs(obj.x);
    const distRight = Math.abs(obj.x - canvas.width);
    const distTop = Math.abs(obj.y);
    const distBottom = Math.abs(obj.y - canvas.height);

    // Encontre a menor distância e retorne a borda correspondente
    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    if (minDist === distLeft) {
        return "left";
    } else if (minDist === distRight) {
        return "right";
    } else if (minDist === distTop) {
        return "top";
    } else {
        return "bottom";
    }
};

// Função para seguir o runner seguir seu target
function follow() {
    for (let i = runners.length - 1; i >= 0; i--) {
        let runner = runners[i];
        // Se move se o target ainda existir
        if (frags.find((frag) => runner.target === frag) !== undefined) {
            const dx = runner.target.x - runner.x;
            const dy = runner.target.y - runner.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Velocidade do runner em direção ao target
            runner.xspd = (dx / distance) * runner.spd;
            runner.yspd = (dy / distance) * runner.spd;

            // Checa se esta voltando
            if (runner.returning) {
                // Escolhe o caminho mais rápido para a saída
                switch(closestBorder(runner)) {
                    case "left":
                        runner.xspd = runner.spd;
                        runner.yspd = 0;
                        break;
                    case "right":
                        runner.xspd = -runner.spd;
                        runner.yspd = 0;
                        break;
                    case "top":
                        runner.xspd = 0;
                        runner.yspd = runner.spd;
                        break;
                    case "bottom":
                        runner.xspd = 0;
                        runner.yspd = -runner.spd;
                        break;
                }

                runner.x -= runner.xspd;
                runner.y -= runner.yspd;
                runner.target.x -= runner.xspd;
                runner.target.y -= runner.yspd;
            } else {
                runner.x += runner.xspd;
                runner.y += runner.yspd;
            }
        } else {
            // Remove runner se não tiver target
            runners.splice(i, 1);
        }
    }
};

//#endregion
