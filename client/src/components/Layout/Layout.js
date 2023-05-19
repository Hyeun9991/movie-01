import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import styled from 'styled-components';

function Layout(props) {
  return (
    <div>
      <Navbar />

      <ContentContainer>{props.children}</ContentContainer>

      <Footer />
    </div>
  );
}

const ContentContainer = styled.main`
  width: 100%;
  height: auto;
  margin: 56px auto;
`;

export default Layout;
