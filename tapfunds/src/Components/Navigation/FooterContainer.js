import React from "react";
import Footer from "./footer"
const FooterContainer = () => {
  return (
    <Footer>
    <Footer.Wrapper>
    <Footer.Row>
        <Footer.Column>
        <Footer.Title>About Us</Footer.Title>
            <Footer.Link href="#">Story</Footer.Link>
            <Footer.Link href="#">Clients</Footer.Link>
            <Footer.Link href="#">Testimonials</Footer.Link>
        </Footer.Column>
        <Footer.Column>
        <Footer.Title>Services</Footer.Title>
            <Footer.Link href="#">Transfers</Footer.Link>
            <Footer.Link href="#">Account Oversight</Footer.Link>
            <Footer.Link href="#">Data Analysis</Footer.Link>
            <Footer.Link href="#">Community Pooling</Footer.Link>
        </Footer.Column>
        <Footer.Column>
        <Footer.Title>Social</Footer.Title>
            <Footer.Link href="#">Facebook</Footer.Link>
            <Footer.Link href="#">Instagram</Footer.Link>
            <Footer.Link href="#">Youtube</Footer.Link>
            <Footer.Link href="#">Twitter</Footer.Link>
        </Footer.Column>
        <Footer.Column>
        <Footer.Title>Contact Us</Footer.Title>
            <div href="#">outreach@tapfunds.net</div>
            <div href="#">PO Box 435, Atlanta, GA, 30293</div>
            <div href="#">423-774-9837</div>
        </Footer.Column>
    </Footer.Row>
    </Footer.Wrapper>
</Footer>
  );
}

export default FooterContainer;