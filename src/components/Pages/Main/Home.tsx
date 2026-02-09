'use client';

import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Content, Container, MainText, MainTextContainer } from '@/styles/components_styles/mainStyle/styled';
import { Apresentation } from '@/components/loveComponents/Apresentation/Apresentation';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import BubbleButton from '@/components/MainPage/buttons/BubbleButton';
import { Statistic, StatisticProps } from 'antd';
import CountUp from 'react-countup';
import { UsingTech } from '@/components/MainPage/Lotties/Tech/UsingTech';
import Features from '@/components/MainPage/Containers/Features/Features';
import BlackContainer from '@/components/MainPage/Containers/BlackContainer/BlackContainer';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

function Home() {
  return (
    <>
      <LoadPage>
        <Header />
        <Container>
          <ScrollReveal>
            <Content>
              <ScrollReveal>
                <MainTextContainer>
                  <MainText>Encante quem você ama com a LoveVerse.</MainText>
                  <section className='subtext-container'>
                    <p>Compartilhe emoções, lembranças e amores junto à LoveVerse. Crie a sua cartinha agora mesmo.</p>
                    <BubbleButton />
                  </section>
                </MainTextContainer>
              </ScrollReveal>
              <ScrollReveal>
                <Content style={{ textAlign: 'left' }}>
                    <section style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                      <Statistic title={<span style={{ fontSize: '1rem', fontWeight: '500', fontFamily: 'var(--font-quicksand)', margin: 0 }}>Casais satisfeitos</span>} value={'1000'} formatter={formatter} />
                      <p style={{fontFamily: 'var(--font-quicksand)', marginTop: '10px'}}>Gratuito</p>
                    </section>
                </Content>
              </ScrollReveal>
              <ScrollReveal>
                <Apresentation />
              </ScrollReveal>
                <ScrollReveal>
                  <UsingTech />
                </ScrollReveal>
            </Content>
          </ScrollReveal><br />
              <Features />
            <BlackContainer />
        </Container>
        <Footer />
      </LoadPage>
    </>
  );
}

export default Home;
