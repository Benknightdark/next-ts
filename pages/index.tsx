import { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
const PostLink = (props:any) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layout>
    <h1>Hello world! - user agent: {userAgent}</h1>
    <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
  </Layout>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default Home;

