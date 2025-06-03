import React from "react";
import { FooterStyle } from "@/styles/components_styles/footer/styled";
import { Span } from "@/styles/components_styles/mainStyle/styled";


const Footer: React.FC = () => {
    return <>
        <FooterStyle>
                    <section>
                        <p>Love<Span>Verse</Span> - <span style={{fontWeight: '300'}}>Feito com amor</span></p>
                    </section>
        </FooterStyle>
    </>
}

export default Footer;