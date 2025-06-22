'use client';

import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import {  Container } from '@/styles/components_styles/mainStyle/styled';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import TutorialColumn from './tutorial-column/TutorialColumns';

function Tutorial() {
  return (
    <>
      <LoadPage>
        <Header />
        <Container>
            <TutorialColumn />
        </Container>
        <Footer />
      </LoadPage>
    </>
  );
}

export default Tutorial;
