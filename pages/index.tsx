import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import { PostLinkModel } from '../models/PostLinkModel';
import { IndexPageModel } from '../models/IndexPageModel';
const PostLink = (props: PostLinkModel) => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
const Home: NextPage<IndexPageModel> = (prop:IndexPageModel) => (
  <Layout>
    <h1>Hello world! - user agent:{prop.userAgent}    </h1>
    <div>{prop.data.length}</div>
    <ul>
      <PostLink id="hello-nextjs" />
      <PostLink id="learn-nextjs" />
      <PostLink id="deploy-nextjs" />
    </ul>
  </Layout>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`)
  let prop=new IndexPageModel();
  prop.userAgent=userAgent;
  prop.data=data;
  return prop;
};

export default Home;

