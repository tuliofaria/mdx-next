import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

//Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'content')

export const getSortedPosts = () => {
  //Reads all the files in the post directory
  const fileNames = fs.readdirSync(postDirectory)

  const allPostsData = fileNames.map((filename) => {
    const slug = filename.replace('.mdx', '')

    let fullPath = path.join(postDirectory, filename)
    const pathStat = fs.statSync(fullPath)
    if (!pathStat.isFile()) {
      fullPath = path.join(postDirectory, filename, 'index.md')
    }
    //Extracts contents of the MDX file

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data } = matter(fileContents)

    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = new Date(data.date).toLocaleDateString(
      'pt-BR',
      options
    )

    const frontmatter = {
      ...data,
      date: formattedDate
    }
    return {
      slug,
      ...frontmatter
    }
  })

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

//Get Slugs
export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postDirectory)

  return fileNames.map((filename) => {
    return {
      params: {
        slug: filename.replace('.mdx', '')
      }
    }
  })
}

//Get Post based on Slug
export const getPostdata = async (slug) => {
  const fullPath = path.join(postDirectory, `${slug}/index.md`)
  const postContent = fs.readFileSync(fullPath, 'utf8')

  return postContent
}
