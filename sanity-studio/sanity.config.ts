import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

import {defineConfig} from 'sanity'
// import {defineConfig} from '@sanity-typed/types'
// import type {InferSchemaValues} from '@sanity-typed/types'

import {defineArrayMember, defineField, defineType} from 'sanity'
// import {defineArrayMember, defineField, defineType} from '@sanity-typed/types'

import * as sanityTypedTypes from '@sanity-typed/types'
console.log('sanityTypedTypes', sanityTypedTypes)

const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'productName',
      type: 'string',
      title: 'Product name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags for item',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tag',
          fields: [
            defineField({type: 'string', name: 'label'}),
            defineField({type: 'string', name: 'value'}),
          ],
        }),
      ],
    }),
  ],
})

/** No changes using defineConfig */
const config = defineConfig({
  projectId: '59t1ed5o',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [product],
  },
})

export default config

/** Typescript type of all types! */
// export type SanityValues = InferSchemaValues<typeof config>
