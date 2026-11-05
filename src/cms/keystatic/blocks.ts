// Page section blocks. One entry per component in src/components/sections/.
import { fields } from '@keystatic/core';
import { PRODUCT_FILTERS } from '../product-options';
import { headedItemsField, imageField, linkField, photoFields } from './fields';

export const pageBlocks = fields.blocks(
  {
    hero: {
      label: 'Hero',
      itemLabel: (props) => props.fields.headline.value || 'Hero',
      schema: fields.object({
        notice: fields.text({
          label: 'Notice line',
          description:
            'Optional. One short fact above the headline, for example the notice needed.',
        }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        primaryCta: linkField('Primary button'),
        secondaryCta: linkField('Secondary button'),
        image: imageField('Image'),
        imageAlt: fields.text({ label: 'Image description (alt text)' }),
        size: fields.select({
          label: 'Size',
          description: 'Full fills the first screen (home page). Compact keeps the content close.',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Full screen', value: 'full' },
          ],
          defaultValue: 'compact',
        }),
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
        link: linkField('Link under the products'),
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
      schema: headedItemsField(
        'Items (up to 4)',
        4,
        photoFields('Photo beside the items (optional)'),
      ),
    },
    cta: {
      label: 'Call to action',
      itemLabel: (props) => props.fields.heading.value || 'Call to action',
      schema: fields.object({
        heading: fields.text({ label: 'Heading' }),
        body: fields.text({ label: 'Body', multiline: true }),
        cta: linkField('Button'),
        ...photoFields('Photo behind the words (optional)'),
      }),
    },
    steps: {
      label: 'Steps',
      itemLabel: (props) => props.fields.heading.value || 'Steps',
      schema: headedItemsField('Steps (up to 4)', 4),
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
