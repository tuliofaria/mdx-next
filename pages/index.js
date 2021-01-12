import { getSortedPosts } from '../lib/posts'
import Link from 'next/link'

const BlogIndex = ({ allPostsData }) => {
  return (
    <>
      {allPostsData.map(({ slug, date, title, excerpt }) => (
        <div key={slug}>
          <li
            sx={{
              display: 'flex',
              flexDirection: ['column', 'row'],
              my: '1rem'
            }}
          >
            <div>
              <Link key={slug} href='/[slug]' as={`/${slug}`}>
                <a>
                  <h2
                    sx={{
                      fontSize: 'calc(1.6rem + 0.2vw)',
                      fontWeight: '500'
                    }}
                  >
                    {title}
                  </h2>
                </a>
              </Link>

              <div sx={{ my: '0.5rem' }}>{excerpt}</div>

              <p>{date}</p>
            </div>
          </li>
        </div>
      ))}
    </>
  )
}
export default BlogIndex

export async function getStaticProps() {
  const allPostsData = getSortedPosts()
  return {
    props: {
      allPostsData
    }
  }
}
