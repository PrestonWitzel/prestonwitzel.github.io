import Inputs from "./Inputs.js"
import Cell from "./Cell.js"

export default class Game {
    constructor(WIDTH, HEIGHT) {
        this.screenWidth = WIDTH;
        this.screenHeight = HEIGHT;
        this.turn = 0;
        this.input = new Inputs();
        this.squareSize = 180;
        this.xWon = false; this.oWon = false; this.tie = false;

        this.cells = [];
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                let c = new Cell(this, ((col * (this.squareSize + this.squareSize/20) + this.screenWidth / 2 - (this.squareSize * 3 + 3 * this.squareSize/20)/2)),
                   ((row * (this.squareSize + this.squareSize/20) + this.screenHeight / 2 - (this.squareSize * 3 + 3 * this.squareSize/20)/2)));
                this.cells.push(c);
            }
        }


    }

    update() {   
        if(!(this.xWon || this.oWon || this.tie)) { 
            let filledCells = 0;
            this.cells.forEach(c => {
                c.update();     
                
                if(c.filled) {
                    filledCells++;
                }
            });
            
            let c = this.cells;

            if((c[0].piece=="X" && c[4].piece=="X" && c[8].piece=="X") || (c[0].piece=="X" && c[1].piece=="X" && c[2].piece=="X") || (c[0].piece=="X" && c[3].piece=="X" && c[6].piece=="X") || (c[2].piece=="X" && c[5].piece=="X" && c[8].piece=="X") || (c[1].piece=="X" && c[4].piece=="X" && c[7].piece=="X") || (c[2].piece=="X" && c[4].piece=="X" && c[6].piece=="X") || (c[6].piece=="X" && c[7].piece=="X" && c[8].piece=="X")) {
                this.xWon = true;
            } else if((c[0].piece=="O" && c[4].piece=="O" && c[8].piece=="O") || (c[0].piece=="O" && c[1].piece=="O" && c[2].piece=="O") || (c[0].piece=="O" && c[3].piece=="O" && c[6].piece=="O") || (c[2].piece=="O" && c[5].piece=="O" && c[8].piece=="O") || (c[1].piece=="O" && c[4].piece=="O" && c[7].piece=="O") || (c[2].piece=="O" && c[4].piece=="O" && c[6].piece=="O") || (c[6].piece=="O" && c[7].piece=="O" && c[8].piece=="O")) {
                this.oWon = true;
            } else {
                if(filledCells == 9) {
                    this.tie = true;
                }
            }
        }
    }

    draw(ctx) {

        this.cells.forEach(c => {
            c.draw(ctx);
        });

        if(this.xWon || this.oWon || this.tie) {
            let txt;
            if(this.xWon) {txt = "X wins!"; ctx.fillStyle = "rgb(255,0,0)"}
            else if(this.oWon) {txt = "O wins!"; ctx.fillStyle = "rgb(0,0,255s)"}
            else if(this.tie) {txt = "Tie!"; ctx.fillStyle = "rgb(255,255,255)"}
            ctx.font = "Bold 60px arial"
            let text = ctx.measureText(txt);
            let tWidth = text.width;
            let tHeight = text.actualBoundingBoxAscent + text.actualBoundingBoxDescent;
            ctx.fillText(txt, (this.screenWidth/2) - (tWidth/2), 
            (this.screenHeight/2) + (tHeight/2));
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.lineWidth = 4;
            ctx.strokeText(txt, (this.screenWidth/2) - (tWidth/2), 
            (this.screenHeight/2) + (tHeight/2));
            ctx.lineWidth = 1;
        }
    }
}