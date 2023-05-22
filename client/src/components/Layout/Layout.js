import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import styled from 'styled-components';

function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <ContentContainer>{children}</ContentContainer>

      <Footer />
    </div>
  );
}

const ContentContainer = styled.main`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

export default Layout;
