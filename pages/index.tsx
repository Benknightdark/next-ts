import { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/Header';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (

    <div>

        <div>
            <Header />
            <p>Hello Next.js</p>
            <h1>Hello world! - user agent: {userAgent}</h1>

        </div>
    </div>

);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default Home;