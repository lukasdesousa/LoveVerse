'use client';

import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Content, Container } from '@/styles/components_styles/mainStyle/styled';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import TermsColumn from './TermsContainer/TermsColumn/TermsColumn';


function Terms() {
  return (
    <>
      <LoadPage>
        <Header />
        <Container>
          <ScrollReveal>
            <Content>
            </Content>
          </ScrollReveal><br />
            <TermsColumn />
        </Container>
        <Footer />
      </LoadPage>
    </>
  );
}

export default Terms;
