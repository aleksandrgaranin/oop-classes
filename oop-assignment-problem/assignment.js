class Course {
    #price;

    get price() {
        return '$' + this.#price
    }

    set price(value) {
        if (value < 0 ){
            throw 'invalid Value!';
        }
        this.#price = value
    }

    constructor(courseTitle, courseLength, coursePrice){
        this.title = courseTitle;
        this.length = courseLength;
        this.price = coursePrice;
    }

    priceValue() {
        const value = this.length/this.#price
        return value
    }

    render() {
        console.log( `Title: ${this.title}; Lengh: ${this.length}; Price: ${this.price} and VALUE: ${this.priceValue().toFixed(2)}`)
    }
}

class PracricalCourse extends Course{  

    constructor(numOfExercises, title, length, price){
        super(title, length, price);
        this.numOfExercises = numOfExercises;
    }
}

class TheoreticalCourse extends Course{
    constructor(title, length, price){
        super(title, length, price);        
    }

    publish(){
        console.log("JavaScript is most popular programming language")
    }
}


const firstCource = new TheoreticalCourse(
    'JavaScript',
    52,
    9.55
)

const secondCource = new PracricalCourse(
    17,
    'React.js',
    55.30,
    12.99
)

// firstCource.price = -5000

console.log(firstCource, secondCource)
firstCource.publish()
firstCource.render()
secondCource.render()
