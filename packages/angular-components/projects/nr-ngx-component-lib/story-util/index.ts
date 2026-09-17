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
    showRowHover: boolean
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
        { code: 'apple', description: 'Apple Apple', extra: 'Ap-fu' },
        { code: 'banana', description: 'Banana Banana', extra: 'Ba-fu' },
        { code: 'orange', description: 'Orange Orange', extra: 'Or-fu' },
        { code: 'grape', description: 'Grape Grape', extra: 'Gr-fu' },
        { code: 'mango', description: 'Mango Mango', extra: 'Ma-fu' },
        { code: 'pineapple', description: 'Pineapple Pineapple', extra: 'Pi-fu' },
        { code: 'strawberry', description: 'Strawberry Strawberry', extra: 'St-fu' },
        { code: 'watermelon', description: 'Watermelon Watermelon', extra: 'Wa-fu' },
        { code: 'blueberry', description: 'Blueberry Blueberry', extra: 'Bl-fu' },
        { code: 'kiwi', description: 'Kiwi Kiwi', extra: 'Ki-fu' },
        { code: 'peach', description: 'Peach Peach', extra: 'Pe-fu' },
        { code: 'pear', description: 'Pear Pear', extra: 'Pe-fu' }        
    ]
}

export function fruitSubOptions() {
    // console.log('fruitSubOptions')
    return fruitOptions().reduce( ( acc, v ) => {
        return acc.concat( [
            { code: v.code + '1', description: v.description + '1', parent: v.code },
            { code: v.code + '2', description: v.description + '2', parent: v.code },
            { code: v.code + '3', description: v.description + '3', parent: v.code },
            { code: v.code + '4', description: v.description + '4', parent: v.code },
        ] )
    }, [] )
}

export const loremIpsum = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.
    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.
    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.
    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
`
