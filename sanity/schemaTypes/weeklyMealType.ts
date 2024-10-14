import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const weeklyMealType = defineType({
  name: 'weeklyMeal',
  title: 'Weekly Meal',
  type: 'document',
  // @ts-ignore
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'availableDate',
      title: 'Available Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'menuItems',
      title: 'Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
    }),
  ],
});
