'use client';

import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import {  Container } from '@/styles/components_styles/mainStyle/styled';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import ContactFeatures from './Contact-features/ContactFeatures';

function ContactUs() {
  return (
    <>
      <LoadPage>
        <Header />
        <Container>
            <ContactFeatures />
        </Container>
        <Footer />
      </LoadPage>
    </>
  );
}

export default ContactUs;
