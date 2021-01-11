import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import fs from 'fs'
import path from 'path'

const components = {}

const Post = ({ source }) => {
  const content = hydrate(source, { components })
  return (
    <>
      <h1>Post</h1>
      <p>{content}</p>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'test'
        }
      }
    ],
    fallback: true
  }
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  // const source = 'Some **mdx** text, with a component'
  const PATH = path.join(process.cwd(), 'content')
  const source = fs.readFileSync(PATH + '/blog-post-1/index.md')
  const mdxSource = await renderToString(source, { components })
  return { props: { source: mdxSource } }
}
export default Post
