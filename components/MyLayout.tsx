import Header from './Header';
import { NextPage } from 'next';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout : NextPage<{}> = (props:any) => (
    <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>

);




// = props => (
 
// );

export default Layout;