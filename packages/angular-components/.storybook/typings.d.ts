declare module '*.md' {
    const content: string;
    export default content;
}

declare module '*.mdx' {
    let MDXComponent: ( props: any ) => React.JSX.Element;
    export default MDXComponent;
}
