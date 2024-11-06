import { set } from 'sanity';
import { defineMigration, at, setIfMissing, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'Move title to title legacy',
  documentTypes: ['menu'],

  migrate: {
    document(doc, context) {
      return [
        at(
          'title',
          set([
            {
              _key: 'en',
              value: doc.title,
            },
          ]),
        ),
        at(
          'description',
          set([
            {
              _key: 'en',
              value: doc.description,
            },
          ]),
        ),
      ];
    },
  },
});
