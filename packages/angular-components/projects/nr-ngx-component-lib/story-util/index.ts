import { StoryObj } from "@storybook/angular"

export function seedRandom( seed: number ) {
    let m = 0x80000000 // 2**31
    let a = 1103515245
    let c = 12345      
    let state = seed

    return function( limit: number ) {
        state = (a * state + c) % m;
        return Math.trunc( state / ( m - 1 ) * limit )
    }
}

export type RowListArgs = {
    pageSize: number,
    pageNumber: number,
    rowCount: number,
    sortColumn: string,
    sortDirection: string
}

export const rowListStory: StoryObj<RowListArgs> = {
    argTypes: {
        pageSize: {
            control: {
                type: 'inline-radio'
            },
            options: [ 5, 10, 20, 50, 100 ]
        },
        pageNumber: {
            control: {
                type: 'range',
                min: 1,
                max: 200
            }
        },
        rowCount: {
            control: {
                type: 'range',
                min: 0,
                max: 2000
            }
        },
    },
    args: {
        pageSize: 10,
        pageNumber: 1,
        rowCount: 100,
        sortColumn: null,
        sortDirection: 'asc'
    }
}

const ROW_ITEMS = [
    {
        "make": "Rockwell",
        "model": "TC-690 Turbo Commander",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "C-208B Grand Caravan",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Beechcraft",
        "model": "200",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Bombardier",
        "model": "Learjet 31 A",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Britten Norman Britten Norman Britten Norman",
        "model": "BN 2A BN 2A BN 2A BN 2A BN 2A BN 2A BN 2A BN 2A ",
        "classification": "Other Other Other Other Other Other",
        "category": "Fixed Wing Fixed Wing Fixed Wing Fixed Wing Fixed Wing ",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "172",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "180 Skywagon",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "182",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "185 Amphib",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    },
    {
        "make": "Cessna",
        "model": "185 Skywagon",
        "classification": "Other",
        "category": "Fixed Wing",
        "crewNumber": 1
    }
]

export function rowListItems( count ) {
    let rnd = seedRandom( 123 )
    return Array.from( { length: count } ).map( (v,i) => {
        return { 
            id: i,
            ...ROW_ITEMS[ rnd( ROW_ITEMS.length ) ] 
        }
    } )
}

export function fruitOptions() {
    return [
        { code: 'apple', description: 'Apple Apple' },
        { code: 'banana', description: 'Banana Banana' },
        { code: 'orange', description: 'Orange Orange' },
        { code: 'grape', description: 'Grape Grape' },
        { code: 'mango', description: 'Mango Mango' },
        { code: 'pineapple', description: 'Pineapple Pineapple' },
        { code: 'strawberry', description: 'Strawberry Strawberry' },
        { code: 'watermelon', description: 'Watermelon Watermelon' },
        { code: 'blueberry', description: 'Blueberry Blueberry' },
        { code: 'kiwi', description: 'Kiwi Kiwi' },
        { code: 'peach', description: 'Peach Peach' },
        { code: 'pear', description: 'Pear Pear' }        
    ]
}