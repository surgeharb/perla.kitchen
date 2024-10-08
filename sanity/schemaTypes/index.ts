import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { recipeType } from './recipeType';
import { menuType } from './menuType';
import { menuItemType } from './menuItemType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, recipeType, menuType, menuItemType],
};
