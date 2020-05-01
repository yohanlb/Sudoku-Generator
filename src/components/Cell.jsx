export default function Cell(key, x, y){
    this.key = key;
    this.x = x;
    this.y = y;
    this.guessedValue = 0;
    this.actualValue = 0;
    this.isGiven = false;
    this.highlighted = false;
}


// function printCell(){
//     return "k:" + this.key + " x:" + this.x + " y:" + this.y;
// }