// Page section blocks. One entry per component in src/components/sections/.
import { fields } from '@keystatic/core';
import { PRODUCT_FILTERS } from '../product-options';
import { imageField, linkField } from './fields';

export const pageBlocks = fields.blocks(
  {
    hero: {
      label: 'Hero',
      itemLabel: (props) => props.fields.headline.value || 'Hero',
      schema: fields.object({
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        primaryCta: linkField('Primary button'),
        secondaryCta: linkField('Secondary button'),
        image: imageField('Image'),
        imageAlt: fields.text({ label: 'Image description (alt text)' }),
      }),
    },
    productGrid: {
      label: 'Products',
      itemLabel: (props) => props.fields.heading.value || 'Products',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        category: fields.select({
          label: 'Which products to show',
          options: [...PRODUCT_FILTERS],
          defaultValue: 'all',
        }),
        featuredOnly: fields.checkbox({
          label: 'Only products marked "Show on the home page"',
          defaultValue: false,
        }),
      }),
    },
    customOrder: {
      label: 'Custom order form',
      itemLabel: (props) => props.fields.heading.value || 'Custom order form',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        note: fields.text({
          label: 'Note under the button',
          description: 'For example how you confirm price and availability.',
          multiline: true,
        }),
      }),
    },
    contact: {
      label: 'Contact',
      itemLabel: (props) => props.fields.heading.value || 'Contact',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        hours: fields.text({
          label: 'Opening hours',
          description: 'Optional. Shown as plain text.',
        }),
      }),
    },
    features: {
      label: 'Features',
      itemLabel: (props) => props.fields.heading.value || 'Features',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Items', itemLabel: (props) => props.fields.title.value },
        ),
      }),
    },
    cta: {
      label: 'Call to action',
      itemLabel: (props) => props.fields.heading.value || 'Call to action',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        body: fields.text({ label: 'Body', multiline: true }),
        cta: linkField('Button'),
      }),
    },
    faq: {
      label: 'FAQ',
      itemLabel: (props) => props.fields.heading.value || 'FAQ',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Questions', itemLabel: (props) => props.fields.question.value },
        ),
      }),
    },
  },
  { label: 'Sections' },
);
