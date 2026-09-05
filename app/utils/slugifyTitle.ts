import slugify from '@sindresorhus/slugify'

export default function slugifyTitle(title: string) {
  return slugify(title, {
    decamelize: false,
    customReplacements: [
      ['\'', '-'],
      ['&', ''],
    ],
  })
}
