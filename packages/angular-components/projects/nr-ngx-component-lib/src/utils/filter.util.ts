import { CodeDescription } from "./code-table.util"

export function wrapFilterValue( val ) {
    if ( !val ) return []
    if ( Array.isArray( val ) ) return val
    return [ val ]
}

export function unwrapFilterValue( val ) {
    if ( !val ) return ''
    if ( Array.isArray( val ) ) return val[ 0 ] || ''
    return val
}

export function mapToCodeDescription( list: Array<any>, codeField: string, descriptionField: string ): CodeDescription[] {
    if ( !list ) return list
    return list.map( v => {
        return {
            code: v[ codeField ],
            description: v[ descriptionField ]
        }
    } )
}
