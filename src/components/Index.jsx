import React from "react";
import styled from "styled-components";

function Index() {
  return (
    <Container>
      <CTA>
        <CTALogoOne src="/disney-plus-clone/images/cta-logo-one.svg" />
        <SignUp>GET ALL THERE</SignUp>
        <Description>
          Get Premier Access to Raya and the Last Dragon for an additional fee
          with a Disney+ subscription. As of 03/26/21, the price of Disney+ and
          The Disney Bundle will increase by $1.
        </Description>
        <CTALogoTwo src="/disney-plus-clone/images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/disney-plus-clone/images/login-background.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    opacity: 0.7;
    z-index: -1;
  }
`;

const CTA = styled.div`
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-top: 100px;
`;

const CTALogoOne = styled.img``;

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  color: #f9f9f9;
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  letter-spacing: 1.5px;
  transition: all 250ms;
  margin: 8px 0 12px 0;

  &:hover {
    background: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;

const CTALogoTwo = styled.img`
  width: 90%;
`;
