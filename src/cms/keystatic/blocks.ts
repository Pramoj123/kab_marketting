// Page section blocks. One entry per component in src/components/sections/.
import { fields } from '@keystatic/core';
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
