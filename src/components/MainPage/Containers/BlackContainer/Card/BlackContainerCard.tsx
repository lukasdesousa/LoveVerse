'use client';

import dynamic from "next/dynamic";
import { FC } from "react";
import animationData from "@/assets/space-02.json";
import styled from "styled-components";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Container = styled.div`
  position: relative;
  overflow: hidden;
  @media (max-width: 968px) {
      height: 400px;
      width: 80vw;
      margin-top: 30px;
  }
  height: 300px;
  width: 700px;
  border-radius: 20px;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 90px 95px, rgba(254, 254, 254, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px;
  

  .box {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    position: relative;
    z-index: 1;
  }

  .lottie {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
`;

const BlackContainerCard: FC = () => {
  return (
    <Container>
      <div className="box">
      </div>
      <Lottie
        className="lottie"
        animationData={animationData}
        loop={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </Container>
  );
};

export default BlackContainerCard;
