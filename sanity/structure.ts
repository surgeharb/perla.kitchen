import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Food')
        .child(
          S.list()
            .title('Food')
            .items([
              S.documentTypeListItem('menu').title('Menus'),
              S.documentTypeListItem('menuItem').title('Menu Items'),
              S.divider(),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('recipe').title('Recipes'),
            ])
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('post').title('Posts'),
            ])
        ),
      S.listItem()
        .title('Other')
        .child(
          S.list()
            .title('Other')
            .items([
              ...S.documentTypeListItems().filter(
                (item) =>
                  item.getId() &&
                  !['post', 'category', 'author', 'recipe', 'menu', 'menuItem'].includes(
                    item.getId()!
                  )
              ),
            ])
        ),
    ]);
