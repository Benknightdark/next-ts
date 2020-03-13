import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import { PostLinkModel } from '../models/PostLinkModel';
import { IndexPageModel } from '../models/IndexPageModel';
import { useEffect } from 'react';
import Markdown from 'react-markdown';

const PostLink = (props: PostLinkModel) => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
const Home: NextPage<IndexPageModel> = (props: IndexPageModel) => {
  useEffect(() => {
    document.title = 'Home';
  });
  return (
    <Layout>
    <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
      <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
      
      <h1>Hello world! - user agent:{props.userAgent}    </h1>
      <ul>
        <PostLink id="hello-nextjs" />
        <PostLink id="learn-nextjs" />
        <PostLink id="deploy-nextjs" />
      </ul>
      <ul>
        {props.data.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="markdown">
      <Markdown
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
    `}
      />
    </div>
   
      </Layout>
  )
};

Home.getInitialProps = async ({ req }) => {

  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`)
  let prop = new IndexPageModel();
  prop.userAgent = userAgent;
  prop.data = data.map((entry: any) => entry.show);
  return prop;
};

export default Home;

