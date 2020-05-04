export default class Cell{
    constructor(key){
        this.key = key;
        this.x = key%9;
        this.y = Math.floor(key/9);
        this.guessedValue = 0;
        this.actualValue = 0;
        this.isGiven = false;
        this.highlighted = false;
        this.possibleValues = [];
    }



    getCellInfo = () =>{
        return{
            key:this.key,
            x:this.x,
            y:this.y,
            guessedValue:this.guessedValue,
            actualValue:this.actualValue,
            isGiven:this.isGiven,
            highlighted:this.highlighted,
            possibleValues:this.possibleValues,
        }
    }




    printCellInfo = () =>{
        console.table(this);
    }

    setPossibleValues(array){
        this.possibleValues = array;
    }

    clearCell(){
        this.guessedValue = 0;
        this.actualValue = 0;
        this.isGiven = false;
        this.highlighted = false;
        this.possibleValues = [];
    }

    setGivenValue(val){
        this.actualValue = val;
        this.isGiven = true;
    }

    setGuessedValue(val){
        this.guessedValue = val;
    }

    setSolvedValue(val){
        this.actualValue = val;
    }

}
