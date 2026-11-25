import { addons } from 'storybook/manager-api';

// Folder index pages.
//
// Clicking a folder in the sidebar normally only expands or collapses it. If the folder has a docs
// page of its own, this opens that page too.
//
// A folder's page is a docs entry whose title is the folder's path, e.g. an unattached
// `<Meta title="Inputs and Controls/Filters" />`, or an MDX attached with `<Meta of={...} />` to stories
// titled with the folder's path. Either way Storybook gives it the id `<folder id>--docs`.
//
// Relies on the sidebar's data-nodetype / data-item-id attributes. If a Storybook upgrade changes them,
// folders just go back to only expanding and collapsing.
addons.register( 'nrcl/folder-index-pages', api => {
    document.addEventListener( 'click', ev => {
        const folder = ( ev.target as HTMLElement | null )?.closest?.( '[data-nodetype="group"]' );
        if ( !folder ) return;

        const indexId = `${ folder.getAttribute( 'data-item-id' ) }--docs`;
        if ( api.getData( indexId ) ) api.selectStory( indexId );
    }, true );
} );
