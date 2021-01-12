import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import Image from 'next/image'
import { getAllPostSlugs, getPostdata } from '../lib/posts'

const components = (slug) => ({
  h1: ({ children }) => <h1>{children}</h1>,
  img: ({ src, alt }) => {
    return (
      <p>
        <Image
          alt={alt}
          src={require('../content/' + slug + '/' + src).default}
          width={450}
          height={450}
          layout='responsive'
        />
      </p>
    )
  }
})

const Post = ({ source, frontMatter, slug }) => {
  const content = hydrate(source, {
    components: components(slug)
  })
  return (
    <>
      <h1>Post</h1>
      <p>{content}</p>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postContent = await getPostdata(params.slug)
  const { data, content } = matter(postContent)
  const mdxSource = await renderToString(content, {
    components: components(params.slug),
    scope: data
  })
  return {
    props: {
      slug: params.slug,
      source: mdxSource,
      frontMatter: data
    }
  }
}

export default Post
